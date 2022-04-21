var express = require('express');
var route = express.Router();

const db_conn= require('../database')
const  {verifyJWT} =require('./tag')
const util=require("util")
route.get('/',async (req, res, next) =>{
    try{
      const query_str='select * from branch'
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)
      res.send(dt)
    }catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.get('/:id', async(req, res, next) =>{
    try{
      const query_str=`select * from branch where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
route.use(verifyJWT)
  route.post('/', async (req, res, next) =>{
    try{
      const query_str="INSERT INTO branch set ?"
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
      res.send(dt)
    }catch(error){  
      res.send(error.sqlMessage)
    }
  });
  route.put('/:id', async(req, res, next) =>{
    try{
      const query_str=`update branch set ? where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.delete('/:id',async (req, res, next) =>{
    try{
      const query_str=`delete from branch where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  module.exports = route;