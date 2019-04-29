let express = require('express');
let route = express.Router();

exports.index= (req,res)=>{
    res.render('login');
};
