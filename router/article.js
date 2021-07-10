const express=require('express')
const {addArticle} = require('../router_handler/article')
const expressJoi = require('@escook/express-joi')
const multer=require('multer')
const {add_article_schema} = require('../schema/artcile')
const path=require('path');
const upload=multer({dest:path.join(__dirname,'../uploads')})
const router=express.Router();
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),addArticle)
module.exports=router