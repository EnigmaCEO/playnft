var mysql = require('mysql');
let Enjin = require("/opt/nodejs/Enjin");

var connection = mysql.createConnection({
    host: process.env.dbName,
    user: "admin",
    password: process.env.dbPass,
    database: "playnft",
});
// console.log(connection);
exports.handler = async (event) => {
  var gameId = event.gameId;
  var tokenId = event.tokenId;
  var tokenIndex = event.tokenIndex;
  
  var query = "SELECT * FROM content WHERE gameId = ? ORDER BY cost DESC";
  var params = [gameId];
  var result;
  
  if(tokenId) {
      var accessToken = await GetAccessToken(56);
      var enjinObj = new Enjin();
      enjinObj.SetAuthToken(accessToken);
      
      var response = JSON.parse(await enjinObj.GetNFT(tokenId));
      
      if(response["data"]["EnjinBalances"].length < 1) {
          console.log("Jumpnet")
        accessToken = await GetAccessToken(62);
        enjinObj.SetAuthToken(accessToken);
        response = JSON.parse(await enjinObj.GetNFT(tokenId, true));
      }
      
      var supply = response["data"]["EnjinBalances"][0]['token']['totalSupply'];
      
      if(supply == 18446744073709551615) supply = 10000;
      
      query = "SELECT * FROM content WHERE gameId = ? AND id NOT IN (SELECT contentId FROM orders WHERE token = ? AND tokenIndex = ? AND status = 1) ORDER BY cost DESC";
      params = [gameId, tokenId, tokenIndex];
  }

  
  
  result = await new Promise(function(resolve, reject) 
  {
          
    connection.query(query, params, function(error, results, fields) {
        
        if( error ) {
            reject(error);
        }
        else
        {
            var contentList = [];
            
            //if(tokenId) {
                results.forEach(function(item) {
                  var cost = item['cost']
                  var adjCost = 0
                  
                  cost *= 0.5;
                  for(let i = 0; i < supply/100; i++) {
                      adjCost += cost * 100;
                      cost *= 0.25;
                  }
                  
                  if(supply%100 > 0) {
                      adjCost += cost * supply%100;
                  }
                  
                  item['adjCost'] = round5(adjCost) - 0.05;
                    
                  contentList.push(item);
                  
                })
            //}
            
            resolve(JSON.stringify(contentList));
        }
    });
        
  })
  
  return result;
};

function round5(x)
{
    return Math.ceil(x/5)*5;
}

async function GetAccessToken(appId)
{
    let query = "SELECT accessToken FROM access_tokens WHERE appId = ?";
    let params = [appId];
    return await new Promise(function(resolve, reject) 
    {
          
        connection.query(query, params, function(error, results, fields) {
        
            if( error ) {
                reject(error);
            }
            else
            {
              console.log(results)
                resolve(results[0].accessToken);
            }
        });
        
    })
}