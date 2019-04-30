var mysql = require('mysql');

var conn = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "",
  database : "pbkk_h"
});

conn.connect((err)=>{
  if(err) throw err;
});

module.exports=conn;
