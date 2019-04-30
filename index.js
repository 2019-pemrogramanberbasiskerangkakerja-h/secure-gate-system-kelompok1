const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const route = require('./route/routes');
const flash = require('express-flash');

const app =express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.set('trust proxy',1);

app.set('views',path.join(__dirname+'/views'));
app.set('view engine','pug');

app.use(session({
    secret : '3cutepeeg',
    resave : false,
    saveUninitialized : true
}));

app.use(flash());


app.use('/',route);

app.use(express.static(__dirname + '/public'));

app.listen(3000, ()=> console.log("Starting server"));
