let express = require('express');
let route = express.Router();
let conn = require('../database/db');

exports.index= (req,res)=>{
    if(req.session.nrp=== undefined || req.session.nrp==='0'){
      return res.render('login');
    }
    else{
      return res.redirect('/dashboard');
    }


};

exports.login=  (req,res)=>{

  var gate = req.body.gate;
  var nrp = req.body.username;
  var password = req.body.pass;

  conn.query("SELECT * from users where users.nrp=? AND users.password=?",[nrp,password],(err,rows,fields)=>{
    if(rows.length==0){ //kalau salah username / password
      req.flash('error','Tidak user'+gate);
      console.log("username / password salah")
      return res.redirect('/');
      res.end();
    }

    else{
      var id_user = rows[0].id_users;

      conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["try login",id_user,gate],(err,rows,fields)=>{ //bikin log
        if(err) console.log(err);
        conn.query("SELECT * FROM access where id_users=? and id_gate=?",[id_user,gate],(err,rows,fields)=>{ //check access
          if(err) console.log(err);
          if(rows.length==0){ //kalau ga punya access
            // console.log("masuk");
            conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["no access",id_user,gate],(err,rows,fields)=>{
              if(err) console.log(err);
            });
            console.log("Tidak ada access");
            return res.redirect('/');
            res.end();
          }
          else{ // punya access
            conn.query("SELECT * from gate where id_gate=?",[gate],(err,rows,fields)=>{
                if(rows.length==1){
                  console.log(rows);
                  var jam_buka = rows[0].jam_buka.split(/[:]/);
                  var jam_tutup = rows[0].jam_tutup.split(/[:]/);
                  var date = new Date();
                  var today = new Date().toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
                  var start = new Date(date.getFullYear(),date.getMonth(),date.getDate(),jam_buka[0],jam_buka[1],jam_buka[2]).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
                  var end = new Date(date.getFullYear(),date.getMonth(),date.getDate(),jam_tutup[0],jam_tutup[1],jam_tutup[2]).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});

                  if(Date.parse(start) < Date.parse(today) && Date.parse(today) < Date.parse(end)){
                    conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["login berhasil",rows[0].id_user,gate],(err,rows,fields)=>{
                      if(err) console.log(err);
                      req.session.nrp = nrp;
                      req.session.gate = gate;
                      console.log(req.session.nrp);
                      return res.redirect('/dashboard');
                      res.end();
                    });
                  }

                  else{ //kalau gate belum buka
                    conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["gate not open yet",rows[0].id_user,gate],(err,rows,fields)=>{
                      if(err) console.log(err);
                      console.log("Gate belum buka");
                      return res.redirect('/');
                      res.end();
                    })
                  }
                }
              });
          }

        });
      });
    }
  });
}

exports.adduser=(req,res)=>{
  console.log(req.params);
  res.status(200);
  res.send(req.params);
}

exports.dashboard=(req,res)=>{
  // console.log(req.session.nrp);
  if(req.session.nrp===undefined || req.session.nrp==='0'){
    return res.redirect('/');
  }
  var gate = req.session.gate;
  return res.render('index',{gate:gate});
}

exports.logout=(req,res)=>{
  conn.query("SELECT * FROM users where nrp=?",[req.session.nrp],(err,rows,fields)=>{
    if(err) console.log(err);
    var id_user = rows[0].id_users;
    var id_gate = req.session.gate;
    conn.query("INSERT INTO log(name_log,id_users,id_gate) VALUES(?,?,?)",["logout",id_user,id_gate],(err,rows,fields)=>{
      if(err) console.log(err);
      req.session.nrp='0';
      req.session.gate='-';
      return res.redirect('/');
    })
  })

}
