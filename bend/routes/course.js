var express = require('express');
var route = express.Router();

const db_conn= require('../database')
const util=require("util")

route.get('/', async (req, res, next) =>{
    try{
      const query_str='select * from course'
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)
      res.send(dt)
    }catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.get('/:id', async(req, res, next) =>{
    try{
      const query_str=`select * from course where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.post('/', async (req, res, next) =>{
    try{
      const query_str="INSERT INTO course set ?"
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
      res.send(dt)
    }catch(error){  
      res.send(error.sqlMessage)
    }
  });
  route.put('/:id', async(req, res, next) =>{
    try{
      const query_str=`update course set ? where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  route.delete('/:id',async (req, res, next) =>{
    try{
      const query_str=`delete from course where id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str,req.body)
    res.send(dt)}catch(error){
  
      res.send(error.sqlMessage)
    }
  });
  
  route.get('/:id/branch', async(req, res, next) =>{
    try{
      const query_str=`select * from branch where f_course_id=${req.params.id}`
      const query = util.promisify(db_conn.query).bind(db_conn);
      const dt=await query(query_str)      







      res.status(200).send(dt)
    }catch(error){
        console.log(error)
        res.status(500).send(error.sqlMessage)
    }
  });
  module.exports = route;