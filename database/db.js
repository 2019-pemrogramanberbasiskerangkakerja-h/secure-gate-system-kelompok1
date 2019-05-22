var mysql = require('mysql');

var conn = mysql.createPool({
  host : "srv64.niagahoster.com",
  user : "semj2564_pbkk",
  password : "j0hnpr@s",
  database : "semj2564_pbkk"
});

conn.getConnection((err,connection)=>{
  if(err) throw err;
  connection.release();
});

module.exports=conn;
