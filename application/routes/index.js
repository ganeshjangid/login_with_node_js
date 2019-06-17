const express=require('express');
const route=express.Router();

const authCont=require('../controllers/auth');

route.get("/", authCont.getHomePage);


module.exports=route;