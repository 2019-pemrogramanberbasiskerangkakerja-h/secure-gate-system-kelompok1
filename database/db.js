var mysql = require('mysql');

var conn_config = {
  host : "srv64.niagahoster.com",
  user : "semj2564_pbkk",
  password : "j0hnpr@s",
  database : "semj2564_pbkk"
};
var conn=mysql.createConnection(conn_config);

function handleDC(){

  
    conn.connect((err)=>{
      if(err){
        setTimeout(handleDC,2000);
      }
    });

    conn.on('error',(err)=>{
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
