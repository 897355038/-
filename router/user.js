const express=require('express');
const router=express.Router();
const {reg_login_schema} = require('../schema/user')
const expressJoi = require('@escook/express-joi')
const user_handler=require('../router_handler/user')
router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser)
router.post('/login',expressJoi(reg_login_schema),user_handler.login)
module.exports=router