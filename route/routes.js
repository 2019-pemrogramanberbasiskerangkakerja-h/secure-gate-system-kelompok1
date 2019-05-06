const express = require('express');
const route = express.Router();

const HomeController = require('../controller/HomeController');

route.get('/',HomeController.index);
route.post('/login',HomeController.login);

route.get('/dashboard',HomeController.dashboard);
route.get('/logout',HomeController.logout);

//api
route.post('/users',HomeController.addUser);
route.get('/users',HomeController.user);
route.get('/users/:userid',HomeController.getuserID);
route.delete('/users/:userid',HomeController.delUserId);
//
route.post('/gates',HomeController.addGate);
route.get('/gates',HomeController.getGates);
route.get('/gates/:gateid',HomeController.getGateID);
route.delete('/gates/:gateid',HomeController.delGateID);


module.exports=route;
