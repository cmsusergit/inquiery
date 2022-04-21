var express = require('express');
var route = express.Router();

const db_conn= require('../database')
const jwtlib=require('jsonwebtoken')
const util=require("util")

const JWT_SECRET="admissioninquery"
route.verifyJWT=(request,response,next)=>{
  const auth=request.headers['authorization']
  const jwt_= auth && auth.split(' ')[1]


      if(jwt_ == null) {
        response.setHeader('Content-Type', 'application/json')
        return response.status(401).send({error:"Login required"});
      }
      else{
        jwtlib.verify(jwt_,JWT_SECRET,(error,result)=>{
        if(error){
            console.log('****',error)  
            response.setHeader('Content-Type', 'application/json')
            response.status(401).send({error:"Credential Invalid"});
        }
        else{
          request.user=result
          next()
          }
        })
      }
}

route.get('/', async (req, res, next) =>{
    try{
      const query_str='select * from tag_info'
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)
      res.send(dt)
    }catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.get('/:id', async(req, res, next) =>{
    try{
      const query_str=`select * from tag_info where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)
      res.send(dt)
    }catch(error){
      res.send(error.sqlMessage)
    }
  });
  route.post('/', async (req, res, next) =>{
    try{
      const query_str="INSERT INTO tag_info set ?"
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
      res.send(dt)
    }catch(error){  
      res.send(error.sqlMessage)
    }
  });
  route.put('/:id', async(req, res, next) =>{
    try{
      const query_str=`update tag_info set ? where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.delete('/:id',async (req, res, next) =>{
    try{
      const query_str=`delete from tag_info where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  module.exports = route;