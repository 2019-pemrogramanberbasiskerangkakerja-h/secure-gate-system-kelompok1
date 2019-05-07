var mysql = require('mysql');

var conn = mysql.createConnection({
  host : "srv64.niagahoster.com",
  user : "semj2564_pbk0k",
  password : "j0hnpr@s",
  database : "semj2564_pbkk"
});

conn.connect((err)=>{
  if(err) throw err;
});

module.exports=conn;
