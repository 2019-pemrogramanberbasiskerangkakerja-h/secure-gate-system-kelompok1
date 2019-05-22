var mysql = require('mysql');

var conn = {
  host : "srv64.niagahoster.com",
  user : "semj2564_pbkk",
  password : "j0hnpr@s",
  database : "semj2564_pbkk"
};
var connection;

function handleDC(){
    connection = mysql.createConnection(conn);

    connection.connect((err)=>{
      if(err){
        setTimeout(handleDC,2000);
      }
    });

    connection.on('error',(err)=>{
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        handleDC();
      }
      else{
        throw err;
      }
    });
}

handleDC();

module.exports=conn;
