var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.dbName,
    user: "admin",
    password: process.env.dbPass,
    database: "playnft",
});


const params = {
    Bucket: 'playnft',
    CreateBucketConfiguration: {
       LocationConstraint: "us-east-1"
    }
};

// console.log(connection);
exports.handler = async (event) => {
    console.log(event)
    let id = event.streamer_id;
    let name = event.streamer_name;
    let email = event.streamer_email;
    let picture = event.streamer_picture;
    
    
    var query = "REPLACE INTO streamers (id, name, email, picture) VALUES (?,?,?,?)"
    var params = [id, name, email, picture];
    
    
  var result
  
  
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
   
  query = "SELECT * FROM nfts WHERE streamerId = ?"
  params = [id];
  
  
  return new Promise(function(resolve, reject) 
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
};