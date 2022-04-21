var express = require('express');
var route = express.Router();

const db_conn= require('../database')
const JWT_SECRET="admissioninquery"
const util=require("util")
const crypto = require('crypto')
const jwt=require('jsonwebtoken')
route.post('/login',async (req,res,next)=>{
      const {email,password}=req.body
      let query_str=`SELECT * from user where email='${email}'`
      const query = util.promisify(db_conn.query).bind(db_conn)

      const dt=await query(query_str)
      if(dt && dt.length <=0){
        res.status(404).send({error:"Record Nt Found"})
      }
      else{
        const user=dt[0]
        if(!user){            
            res.status(404).send({error:"Record Nt Found"})
        }
        else{
          const encryptedPwd = crypto.pbkdf2Sync(password,'salt', 100, 64, `sha512`).toString(`hex`)      
          if(encryptedPwd==user.password){
              const jwt1 = jwt.sign({usertype:user.usertype,email:user.email},JWT_SECRET,{expiresIn: "2h"})
              user.jwt_ = jwt1
              delete user['password']              
              res.status(200).send(user)
          }
          else{
            res.status(401).send({error:"Login Failed, Invalid Login Credential"})
          }
        }
      }
}),



route.post('/changepwd',async (req,res,next)=>{
  const {email,oldpwd,newpwd}=req.body
  let query_str=`SELECT * from user where email='${email}'`
  const query = util.promisify(db_conn.query).bind(db_conn)
  const dt=await query(query_str)
  if(dt && dt.length <=0){
    res.status(404).send({error:"Record Nt Found"})
  }
  else{
    const user=dt[0]
    if(!user){            
        res.status(404).send({error:"Record Nt Found"})
    }
    else{
      const encryptedPwd = crypto.pbkdf2Sync(oldpwd,'salt', 100, 64, `sha512`).toString(`hex`)      
      if(encryptedPwd==user.password){
        let encryptedPassword = crypto.pbkdf2Sync(newpwd,'salt',100,64,`sha512`).toString(`hex`)  
        const query_str=`update user set password='${encryptedPassword}' where email='${email}'`
        const query = util.promisify(db_conn.query).bind(db_conn)
        const dt=await query(query_str)
        res.status(200).send(dt)
      }
      else{
        res.status(401).send({error:"Change Password Failed, Invalid Login Credential"})
      }
    }
  }
}),


route.post('/logout',async (req,res,next)=>{
  const auth=req.headers['authorization']
  const jwt_= auth && auth.split(' ')[1]  
  jwt.sign(jwt_, "", { expiresIn: 1 } , (logout, error) => {
      if (logout) {
        res.status(200).send({mesg : 'You have been Logged Out' });
      } else {
        res.status(401).send({mesg:'Error'});
      }
    });
})
route.get('/', async (req, res, next) =>{
  try{
    const query_str='select * from user'
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str)
    res.send(dt)
  }catch(error){
    res.status(401).send(error.sqlMessage)
  }
});

route.get('/:id', async(req, res, next) =>{
  try{
    const query_str=`select * from user where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str)
    res.status(200).send(dt)
  }catch(error){
    res.status(500).send(error.sqlMessage)
  }
});

route.post('/', async (req, res, next) =>{
  try{
    const userInfo=req.body
    console.log(userInfo)
    const query_str1=`SELECT * FROM user where email='${userInfo.email}'`
    const query_select = util.promisify(db_conn.query).bind(db_conn);
    const rr=await query_select(query_str1,req.body)
    if(rr && rr.length>0){
      res.send("User Already Exist").end(401)
    }
    else{
      const query_str="INSERT INTO user set ?"
      const query = util.promisify(db_conn.query).bind(db_conn)
      let encryptedPassword = crypto.pbkdf2Sync(userInfo.password,'salt',100,64,`sha512`).toString(`hex`)
      userInfo.password=encryptedPassword
      const dt=await query(query_str,userInfo)
      res.status(200).send(dt)
    }
  }catch(error){  
    console.log(error)
    res.status(401),send(error)
  }
});
route.put('/:id', async(req, res, next) =>{
  try{
    const query_str=`update user set ? where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str,req.body)
  res.send(dt)}catch(error){

    res.send(error.sqlMessage)
  }
});
route.delete('/:id',async (req, res, next) =>{
  try{
    const query_str=`delete from user where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str,req.body)
  res.send(dt)}catch(error){

    res.send(error.sqlMessage)
  }
});
module.exports = route;