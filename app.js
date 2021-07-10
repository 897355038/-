const express=require('express');
const cors=require('cors');
const userRouter=require('./router/user');
const artcateRouter=require('./router/artcate');
const userinfoRouter=require('./router/userinfo');
const articleRouter=require('./router/article')
const joi=require('joi');
const expressJWT=require('express-jwt');
const config = require('./config');
const app=express();
//跨域中间件
app.use(cors());
app.use('/uploads',express.static('./uploads'))
//解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))
app.use(function(req,res,next){
    res.cc=function(err,status=1){
        res.send({
            status,
            msg:err instanceof Error ? err.message : err
        })
    }
    next()
})
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))
//中间件一定要在路由前面
app.use('/api',userRouter)
app.use('/my',userinfoRouter)
app.use('/my/artic',artcateRouter)
app.use('/my/article',articleRouter)
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.cc(err)
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
})
app.listen(3007,()=>{
    console.log('http://127.0.0.1:3007')
})