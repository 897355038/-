const bcrypt=require('bcryptjs');
const db=require('../db/index');
const jwt = require('jsonwebtoken');
const config = require('../config')
exports.regUser=(req,res)=>{
    const userInfo = req.body;
    if(!userInfo.username || !userInfo.password){
        res.cc('用户名或密码不合法')
    }
    const sqlStr='select * from ev_users where username=?';
    db.query(sqlStr,userInfo.username,(err,data)=>{
        if(err){
            return res.cc(err)
        }
        if(data.length>0){
            return res.cc('用户名已经被占用')
        }
        //加密 
        userInfo.password=bcrypt.hashSync(userInfo.password,10)
        const sql='insert into ev_users set ?'
        db.query(sql,{username:userInfo.username,password:userInfo.password},(err,data)=>{
            if(err) return res.cc(err)
            if(data.affectedRows!==1) return  res.cc('注册用户失败')
            res.cc('注册用户成功',0)
        })
    })

}
exports.login=(req,res)=>{
    const userinfo=req.body;
    const sql='select * from ev_users where username=?';
    db.query(sql,userinfo.username,(err,data)=>{
        if(err) return res.cc(err)
        if(data.length!==1) return res.cc('登陆失败!')
        const compareResult = bcrypt.compareSync(userinfo.password,data[0].password)
        if(!compareResult) {
            return res.cc('登录失败')
        }
        const user={...data[0],password:'',user_pic:''};
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{
            expiresIn:config.expiresIn
        })
        res.send({
            status:0,
            meg:'登录成功',
            token:'Bearer ' + tokenStr
        })
    })
}