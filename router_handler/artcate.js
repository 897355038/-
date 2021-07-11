const db=require('../db/index')
exports.getArticCates = (req,res)=>{
    const sql=`select * from ev_artic_cate where is_delete=0 order by id asc`
    db.query(sql,(err,data)=>{
        if(err) return res.cc(err);
        res.send({
            status:0,
            msg:'查询数据成功',
            data:data
        })
    })
}
exports.addArticCates = (req,res)=>{
    const sqlStr = 'select * from ev_artic_cate where name=? or alias=?'
    db.query(sqlStr,[req.body.name,req.body.alias],(err,result)=>{
        const articInfo = req.body
        if(err)return res.cc(err)
        if(result.length===2)return res.cc('分类名称与别名被占用，请更换后重试')
        if(result.length===1 && result[0].name===articInfo.name && result[0].alias===articInfo.alias) return  res.cc('分类名称与别名被占用，请更换后重试')
        if(result.length===1 && result[0].name===articInfo.name) return res.cc('名称被占用了')
        if(result.length===1 && result[0].alias===articInfo.alias) return res.cc('别名被占用了')
        const sql='insert into ev_artic_cate set ?'
        db.query(sql,articInfo,(err,data)=>{
            if(err) return res.cc(err)
            if(data.affectedRows!==1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功',0)
        })
    })
}
exports.deleteCateById=(req,res)=>{
  const sql='update ev_artic_cate set is_delete=1 where id=?'
  db.query(sql,req.params.id,(err,data)=>{
      if(err) return res.cc(err)
      if(data.affectedRows!==1) return res.cc('删除文章分类失败')
      res.cc('删除文章分类成功',0)
  })
}
exports.getCateById=(req,res)=>{
 const sql=`select * from ev_artic_cate where id=?`
 db.query(sql,req.params.id,(err,data)=>{
     if(err)return res.cc(err)
     if(data.length!==1) return res.cc('获取文章详情失败')
     res.send({
         status:0,
         msg:'获取文章详情成功',
         data:data[0]
     })
 })
}
exports.updatetCateById=(req,res)=>{
    const articInfo = req.body
    const sql=`select * from ev_artic_cate where Id<>? and (name=? or alias=?)`
    db.query(sql,[articInfo.Id,articInfo.name,articInfo.alias],(err,result)=>{
        if(err) return res.cc(err)
        if(result.length ===2) return res.cc('分类名称与别名被占用，请更换后重试')
        if(result.length===1 && result[0].name===articInfo.name && result[0].alias===articInfo.alias) return  res.cc('分类名称与别名被占用，请更换后重试')
        if(result.length===1 && result[0].name===articInfo.name) return res.cc('名称被占用了')
        if(result.length===1 && result[0].alias===articInfo.alias) return res.cc('别名被占用了')
        const sqlStr='update ev_artic_cate set ? where Id=?'
        db.query(sqlStr,[articInfo,articInfo.Id],(err,data)=>{
            if(err) return res.cc(err)
            if(data.affectedRows!==1) return res.cc('更新文章分类失败')
            res.cc('更新文章分类成功',0)
        })


    })
}