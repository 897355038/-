const express=require('express');
const {add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema} = require('../schema/artcate')
const expressJoi = require('@escook/express-joi')
const {getArticCates,addArticCates,deleteCateById,getCateById,updatetCateById} = require('../router_handler/artcate')
const router=express.Router();
router.get('/cates',getArticCates)
router.post('/addcates',expressJoi(add_cate_schema),addArticCates)
router.get('/deletecate/:id',expressJoi(delete_cate_schema),deleteCateById)
router.get('/getcate/:id',expressJoi(get_cate_schema),getCateById)
router.post('/updatecate',expressJoi(update_cate_schema),updatetCateById)
module.exports=router