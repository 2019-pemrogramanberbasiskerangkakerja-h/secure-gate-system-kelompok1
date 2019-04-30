let express = require('express');
let route = express.Router();
let conn = require('../database/db');

exports.index= (req,res)=>{
    console.log(req.session.nrp);
    if(req.session.nrp!== undefined){
      res.redirect('/dashboard');
    }
    var gate = req.query.gate;
    if(!req.query.gate){
      res.redirect('/?gate=1');
      res.end();
    }
    res.render('login',{gate:gate});
};

exports.login= (req,res)=>{

  var gate = req.body.gate;
  var nrp = req.body.username;
  var password = req.body.pass;

  conn.query("SELECT * from users where users.nrp=? AND users.password=?",[nrp,password],(err,rows,fields)=>{
    if(rows.length==0){
      res.redirect('/?gate='+gate);
    }
    else{
      conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["try login",rows[0].id_user,gate],(err,rows,fields)=>{
        if(err) console.log(err);
      })
    }
  });



  conn.query("SELECT * from gate where id_gate=?",[gate],(err,rows,fields)=>{
      if(rows.length==1){
        console.log(rows);
        var jam_buka = rows[0].jam_buka.split(/[:]/);
        var jam_tutup = rows[0].jam_tutup.split(/[:]/);
        var date = new Date();
        var today = new Date().toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
        var start = new Date(date.getFullYear(),date.getMonth(),date.getDate(),jam_buka[0],jam_buka[1],jam_buka[2]).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
        var end = new Date(date.getFullYear(),date.getMonth(),date.getDate(),jam_tutup[0],jam_tutup[1],jam_tutup[2]).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
        console.log(start);
        console.log(today);
        console.log(end);
        console.log(Date.parse(start));
        console.log(Date.parse(today));
        console.log(Date.parse(end));
        if(Date.parse(start) < Date.parse(today) && Date.parse(today) < Date.parse(end)){
          conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["login berhasil",rows[0].id_user,gate],(err,rows,fields)=>{
            if(err) console.log(err);
            req.session.nrp = nrp;
            console.log(req.session.nrp);
            res.redirect('/dashboard');
          });
        }
        else{
          conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["failed login",rows[0].id_user,gate],(err,rows,fields)=>{
            if(err) console.log(err);
            console.log("Gate belum buka");
            res.redirect('/?gate='+gate);
          })
        }
      }
    });



}

exports.dashboard=(req,res)=>{
  // console.log(req.session.nrp);
  res.render('index');
}
