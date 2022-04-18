let mysql = require("mysql");
let Enjin = require("/opt/nodejs/Enjin");
let enigma = require("/opt/nodejs/enigma");

//connect to playnft
var connection;

exports.handler = async (event) => {

    
    await enigma.ConnectDB();
    let accessToken = JSON.parse(await GetEnjinAccessToken(333,"4Dhewi1FryCPfjeWIWUFQrt8n6v9F1YInYQfZDrE", true))["data"]["AuthApp"]["accessToken"];
    await UpdateAppToken(accessToken, 333);
    
    accessToken = JSON.parse(await GetEnjinAccessToken(246, "r48Feat2aq6QyVJDZs6CZFc0YEWlPM25Vkmjpp0Q", false))["data"]["AuthApp"]["accessToken"];
    await UpdateAppToken(accessToken, 246);
    
    await enigma.DisconnectDB();
    
    connection = mysql.createConnection({
        host: process.env.dbName,
        user: "admin",
        password: process.env.dbPass,
        database: "playnft",
    });
    
    accessToken = JSON.parse(await GetEnjinAccessToken(62,"7oxAI9k6mk97DIapSwkmEgNllpfQ3UmsX6WIv7PY", true))["data"]["AuthApp"]["accessToken"];
    UpdatePlayNFTToken(accessToken, 62);
    
    accessToken = JSON.parse(await GetEnjinAccessToken(56,"UtF1TkXhpmFkrIlheZILV4LyWX7uq6wRKaqX6uiN", false))["data"]["AuthApp"]["accessToken"];
    UpdatePlayNFTToken(accessToken, 56);
    
    return "success";
    
};

async function GetEnjinAccessToken(appId, appSecret, jumpnet = false) {
    
    let EnjinObject = new Enjin();
    EnjinObject.SetAuthToken(null);
    let query = 
    `query {
        AuthApp(id: ${appId}, secret: "${appSecret}") {
            accessToken
            }
        }`; 
    
    let enjinResponse = null;
    
    await EnjinObject.run_cloud_graphQL(query,false, jumpnet)
    .then(function(value) {
        console.log(value);
        enjinResponse = value;
    });
    
    return enjinResponse;
    
}

async function UpdateAppToken(accessToken, appId)
{
    let query = "INSERT INTO enigma_enjin.access_tokens (appId, accessToken, expiration) VALUES(?,?,NOW() + INTERVAL 1 DAY) ON DUPLICATE KEY UPDATE accessToken=?, expiration=NOW()+INTERVAL 1 DAY";
    let params = [appId,accessToken, accessToken];
    await enigma.QueryDB(query, params, false);
}

async function UpdatePlayNFTToken(accessToken, appId)
{
    let query = "INSERT INTO access_tokens (appId, accessToken, expiration) VALUES(?,?,NOW() + INTERVAL 1 DAY) ON DUPLICATE KEY UPDATE accessToken=?, expiration=NOW()+INTERVAL 1 DAY";
    let params = [appId,accessToken, accessToken];
    await new Promise(function(resolve, reject) 
    {
          
        connection.query(query, params, function(error, results, fields) {
        
            if( error ) {
                reject(error);
            }
            else
            {
                resolve(JSON.stringify(results));
            }
        });
        
    })
}