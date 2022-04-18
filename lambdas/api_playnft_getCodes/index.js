var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.dbName,
    user: "admin",
    password: process.env.dbPass,
    database: "playnft",
});



// console.log(connection);
exports.handler = async (event) => {
    console.log(event)
    
  var gameId = event.gameId ? event.gameId : event.data.gameId
  var wallet = event.wallet ? event.wallet : event.data.wallet
  
  
  
  if (isNaN(gameId)) return '[{"error":"Invalid Game ID"}]';
  if (!validateInputAddresses(wallet)) return '[{"error":"Invalid Wallet Address"}]';
  
  // test
  if(gameId == 0) return "[{\"code\":\"test_quest\"}]";
  

    var query = "SELECT code FROM content WHERE id IN (SELECT contentId FROM orders WHERE wallet = ? AND gameId = ? and status = 1 and mode = 'gamers')"
    var params = [wallet, gameId];
    
    return await new Promise(function(resolve, reject) 
    {
            
      connection.query(query, params, function(error, results, fields) {
          
          if( error ) {
              reject(error);
          }
          else
          {
              resolve(JSON.stringify(results));
              //resolve(JSON.stringify('[{"code":"quest_shalwend"}, {"code":"quest_bluenarwhal"}, {"code":"quest_cheesenarwhal"}, {"code":"quest_emeraldnarwhal"}, {"code":"quest_crimsonnarwhal"}]'));
            }
      });
          
    })
  
};

function validateInputAddresses(address) {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}