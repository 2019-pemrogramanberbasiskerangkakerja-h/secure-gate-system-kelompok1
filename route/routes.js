const express = require('express');
const route = express.Router();

const HomeController = require('../controller/HomeController');

route.get('/',HomeController.index);
route.post('/login',HomeController.login);

route.get('/dashboard',HomeController.dashboard);


module.exports=route;
