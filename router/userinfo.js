const express=require('express');
const {getUserInfo,updateUserInfo,updatePassword,updateAvatar} = require('../router_handler/userinfo')
const {update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')
const expressJoi = require('@escook/express-joi')
const router=express.Router();
router.get('/userinfo',getUserInfo)
router.post('/userinfo',expressJoi(update_userinfo_schema),updateUserInfo)
router.post('/updatepwd',expressJoi(update_password_schema),updatePassword)
router.post('/updateAvatar',expressJoi(update_avatar_schema),updateAvatar)
module.exports=router