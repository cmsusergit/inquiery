var express = require('express');
var route = express.Router();

const db_conn= require('../database')
const  {verifyJWT} =require('./tag')
const util=require("util")

route.post('/', async (req, res, next) =>{
  const inqueryOb= req.body
  const preferredBranchList=inqueryOb['preferredBranchList']
  delete inqueryOb['preferredBranchList']
  inqueryOb['is_counselling_req']=inqueryOb['is_counselling_req']==true?1:0
  
  inqueryOb['is_closed']=inqueryOb['is_closed']==true?1:0
  if(inqueryOb.counselling_type==0){  
    inqueryOb.preffered_date=null
  }
  try{
    const query_str="INSERT INTO inquiry set ?"
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str,inqueryOb)
    const insert_inquery_id=dt.insertId
    preferredBranchList.forEach(async (branch,indx) => {
      const ob={
        id:0,
        f_inquiry_id:insert_inquery_id,
        f_branch_id:branch.id,priority:indx+1,
        handled_date: new Date(),
        f_user_id:-1
      }
      const query_str1="INSERT INTO preffred_branch set ?"
      const query1 = util.promisify(db_conn.query).bind(db_conn)
      await query1(query_str1,ob)      
    });
    res.send(dt)
  }catch(error){  
    console.log(error)
    res.send(error.sqlMessage)
  }
});
route.put('/:id', async(req, res, next) =>{
  try{
    const query_str=`update inquiry set ? where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str,req.body)
  res.send(dt)}catch(error){

    res.send(error.sqlMessage)
  }
});
route.delete('/:id',async (req, res, next) =>{
  try{
    const query_str=`delete from inquiry where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str,req.body)
  res.send(dt)}catch(error){
    res.send(error.sqlMessage)
  }
});

route.get('/', async (req, res, next) =>{
  try{
    const ob=req.query
    const query_str=`select * from inquiry ${ob.searchtext ? "where "+ob.searchby+" like '%"+ob.searchtext+"%'":''} ORDER BY ${ob.sortby?ob.sortby:'inquery_date'} ${ob.sortdir?(ob.sortdir=='ASC'?'ASC':'DESC'):'ASC'} ${ob.limit ? "limit "+ob.limit:""} ${ob.offset?"offset "+ob.offset:""}`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    res.status(200).send(dt)
  }catch(error){
    console.log('----',error)
    res.status(500).send(error)
  }
});
route.get('/contactexist', async (req, res, next) =>{
  try{
    const ob=req.query
    const query_str=`select id from inquiry where mobile=${ob.mobile}`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    res.status(200).send((dt && dt.length>0)?{found:true}:{found:false})
  }catch(error){
    console.log('----',error)
    res.status(500).send(error)
  }
});
route.get('/count', async (req, res, next) =>{
  try{
    const ob=req.query    
    // 
    // const query_str=`select count(*) from inquiry ${ob.searchtext ? "where "+ob.searchby+" like '%"+ob.searchtext+"%'":''}`    
    let query_str=''
    if(ob.dept && ob.dept!=-1){
      query_str=`select count(*) from inquiry,preffred_branch,branch ${ob.searchtext ? "where "+ob.searchby+" like '%"+ob.searchtext+"%'":''} `
      query_str+= `${ob.searchtext?' and ':' where '}` + `f_inquiry_id=inquiry.id  and f_dept_id=${ob.dept} and branch.id = f_branch_id ${(ob.is_closed!=-1)?(' and is_closed='+ob.is_closed):''}`
    }
    else{
      query_str=`select count(*) from inquiry ${ob.searchtext ? "where "+ob.searchby+" like '%"+ob.searchtext+"%'":''} ${(ob.is_closed!=-1)?((ob.searchtext?' and ':' where ')+' is_closed='+ob.is_closed):''}`
    }
    console.log(query_str);
    
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    res.status(200).send({count:dt[0]['count(*)']})
  }catch(error){
    console.log('----',error)
    res.status(500).send(error)
  }
});
route.get('/countforadmin', async(req, res, next) =>{
  try{

    const query_str=`select count(*) as total from inquiry`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const total=await query(query_str)
    const query_str1=`select count(*) as openCount from inquiry where is_closed=0`
    const query1 = util.promisify(db_conn.query).bind(db_conn)
    const openCount=await query1(query_str1)

    const query_str_closed=`select count(*) as closedCount from inquiry where is_closed=1`
    const query_closed = util.promisify(db_conn.query).bind(db_conn);
    const closedCount=await query_closed(query_str_closed)
    const query_str_dt=`select count(*) as countDt from inquiry where inquery_date=DATE(${new Date().toLocaleDateString()})`
    const query_dt = util.promisify(db_conn.query).bind(db_conn)
    const dtCount=await query_dt(query_str_dt)
    res.status(200).send({
      total:total[0].total,open:openCount[0].openCount,closed:closedCount[0].closedCount,dtCount:dtCount[0].countDt
    })
  }catch(error){
    console.log(error)
    res.status(500).send(error.sqlMessage)
  }
});
route.get('/countbydt', async (req, res, next) =>{  
  try{
    let query_str=`SELECT DATE(inquery_date) as in_date,count(*) as count FROM inquiry group by DATE(inquery_date)`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    let tempList1=[['Inquiry Date','Number Of Inquieries']]
    dt.forEach(ob=>{
      tempList1.push([new Date(ob.in_date).toLocaleDateString('en-US',{day:'2-digit',month:'short'}),ob.count])
    })

    res.status(200).send(tempList1)
  }catch(error){  
    console.log(error)
    res.status(500).send(error.sqlMessage)
  }
});
route.get('/countbydept', async (req, res, next) =>{  
  try{
    let query_str=`SELECT branch.branch_alias,sum(inquiry.is_closed=1) as closed,sum(inquiry.is_closed=0) as open FROM preffred_branch,branch,inquiry where f_branch_id=branch.id and f_inquiry_id=inquiry.id group by f_branch_id`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    let tempList1=[['Preffered Branch','CL','OP']]
    dt.forEach(ob=>{
      tempList1.push([ob.branch_alias,ob.closed,ob.open])
    })

    res.status(200).send(tempList1)
  }catch(error){  

    console.log(error)
    res.status(500).send(error.sqlMessage)
  }
});
route.get('/inquiryfaq', async (req, res, next) =>{
  try{
    const query_str=`select * from inquiry_faq`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    console.log(dt)
    res.status(200).send(dt)
  }catch(error){
    console.log('----',error)
    res.status(500).send(error)
  }
});
route.get('/detailed', async (req, res, next) =>{
  try{
    const ob=req.query
    let query_str=`select * from inquirydetail ${ob.searchtext ? "where "+ob.searchby+" like '%"+ob.searchtext+"%'":''} ${(ob.is_closed!=-1)?((ob.searchtext?' and ':' where ')+' is_closed='+ob.is_closed):''} group by id ORDER BY ${ob.sortby?ob.sortby:'inquery_date'} ${ob.sortdir?(ob.sortdir=='ASC'?'ASC':'DESC'):'ASC'} ${ob.limit ? "limit "+ob.limit:""} ${ob.offset?"offset "+ob.offset:""}`
    console.log(query_str);
    if(ob.dept && ob.dept!=-1){
      if(ob.searchtext)
        query_str=`select * from inquirydetail where f_dept_id=${ob.dept} and ${ob.searchby} like '%${ob.searchtext}%'`
      else
        query_str=`select * from inquirydetail where f_dept_id=${ob.dept}`
      query_str+= `${(ob.is_closed!=-1)?(' and is_closed='+ob.is_closed):''} group by id ORDER BY ${ob.sortby?ob.sortby:'inquery_date'} ${ob.sortdir?(ob.sortdir=='ASC'?'ASC':'DESC'):'ASC'} ${ob.limit ? "limit "+ob.limit:""} ${ob.offset?"offset "+ob.offset:""}`
    }
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str) 
    // const query_str=`select * from inquiry ${ob.searchtext ? "where "+ob.searchby+" like '%"+ob.searchtext+"%'":''} ORDER BY ${ob.sortby?ob.sortby:'inquery_date'} ${ob.sortdir?(ob.sortdir=='ASC'?'ASC':'DESC'):'ASC'} ${ob.limit ? "limit "+ob.limit:""} ${ob.offset?"offset "+ob.offset:""}`
    // console.log(query_str);
    // const query = util.promisify(db_conn.query).bind(db_conn)
    // const dt=await query(query_str)
      const result=dt.map(async(record)=>{      
      let query_str1=`select 
        preffred_branch.id,branch_name,branch_alias,f_dept_id,priority,f_user_id,handled_date 
        from 
        preffred_branch,branch 
        where f_inquiry_id=${record.id} and f_branch_id=branch.id order by priority`
      const query1 = util.promisify(db_conn.query).bind(db_conn)
      const dt1=await query1(query_str1)
      dt1.forEach(tt=>{
        console.log(record.name,tt.branch_name)
      })
      // const query_str_done=`select inquiryhandled.f_inquiry_id,branch.id from inquiryhandled,preffred_branch,branch,user where inquiryhandled.f_inquiry_id=preffred_branch.f_inquiry_id and branch.id=f_branch_id and f_user_id=user.id and user.f_dept_id=branch.f_dept_id and inquiryhandled.f_inquiry_id=${record.id}`
      // const query_done = util.promisify(db_conn.query).bind(db_conn)
      // const dt1_1=await query_done(query_str_done)
      // console.log(record.id,dt1_1)
      // dt1.map(tt=>{
      //   tt.handled=0
      //   dt1_1.map(ob=>{
      //     if(ob.id==tt.f_branch_id)
      //       tt.handled=1
      //   })
      //   console.log('----',tt);
      // })
      record.preferredBranchList=dt1
      return record
    })    
    const rr= await Promise.all(result)      
    // let tempList1=rr
    // if(ob.dept && ob.dept!=-1){
    //   tempList1=rr.filter(tt=>{
    //     return tt.preferredBranchList.findIndex(temp1=>temp1.f_dept_id==ob.dept)!=-1      
    //   })
    // }
    res.status(200).send(rr)    
  }catch(error){
    console.log('----',error)
    res.status(500).send({error:error.sqlMessage})
  }
});
route.get('/detailed/:id', async(req, res, next) =>{
  try{
    const query_str=`select * from inquiry where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str)
    const query_str1=`select preffred_branch.id,branch_name,branch_alias,f_dept_id,priority,f_user_id,handled_date from preffred_branch,branch where f_inquiry_id=${dt[0].id} and f_branch_id=branch.id`
    const query1 = util.promisify(db_conn.query).bind(db_conn)
    const dt1=await query1(query_str1)
    dt[0].preferredBranchList=dt1
    res.send(dt[0])
  }catch(error){
    res.send(error.sqlMessage)
  }
});

route.get('/:id', async(req, res, next) =>{
  try{
    const query_str=`select * from inquiry where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str)
  res.send(dt)}catch(error){
    res.send(error.sqlMessage)
  }
});

route.patch('/:id', async(req, res, next) =>{
  try{
    const query_str=`update inquiry set is_closed=${req.body.is_closed},f_closed_by=${req.body.f_closed_by} where id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn);
    const dt=await query(query_str)
  res.send(dt)}catch(error){
    res.send(error.sqlMessage)
  }
});
route.get('/:id/branch', async (req, res, next) =>{
  try{
    const query_str=`select preffred_branch.id,branch_name,branch_alias,f_dept_id,f_user_id,handled_date from preffred_branch,branch where f_inquiry_id=${req.params.id} and f_branch_id=branch.id`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str)
    res.status(200).send(dt)
  }catch(error){
    console.log(error)
    res.status(500).send(error)
  }
});
route.post('/:id/branchhandled/', async (req, res, next) =>{  
  const ob= req.body
  try{
    const user_query_str=`select f_branch_id from preffred_branch,branch,user where preffred_branch.f_branch_id=branch.id and branch.f_dept_id=user.f_dept_id and user.id=${ob.f_user_id}`
    console.log(user_query_str);
    const user_query = util.promisify(db_conn.query).bind(db_conn)        
    const dt_branchlist=await user_query(user_query_str)
    const prList=dt_branchlist.map(async(record)=>{
      const query_str=`UPDATE preffred_branch set f_user_id=${ob.f_user_id},handled_date='${new Date().toJSON().slice(0, 10)}' where f_inquiry_id=${req.params.id} and f_branch_id=${record.f_branch_id}`
      const query = util.promisify(db_conn.query).bind(db_conn) 
      await query(query_str)
    })
    Promise.all(prList).then(tt=>{      
      res.status(200).send(tt)
    })    
  }catch(error){  
    res.status(500).send(error.sqlMessage)
  }
});

route.post('/comment', async (req, res, next) =>{  
  const ob= req.body
  try{
    const prList=ob.map(async(record)=>{    
      const query_str1="INSERT INTO comment set ?"
      const query1 = util.promisify(db_conn.query).bind(db_conn)
      await query1(query_str1,record)      
    })
    Promise.all(prList).then(rr=>{      
      res.status(200).send({'mesg':'done'})
    })
    .catch(error1=>{
      console.log(error1)
      res.status(500).send(error1)
    })
  }catch(error){  
    res.status(500).send(error.sqlMessage)
  }
});
route.delete('/:id/comment/:userid', async (req, res, next) =>{  
  const ob= req.body
  try{
    const query_str=`delete from comment where f_inquiry_id=${req.params.id} and f_inquiryhandled_id=${req.params.userid}`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str,ob)
    res.status(200).send(dt)
  }catch(error){  
    res.status(500).send(error.sqlMessage)
  }
});
route.get('/:id/comment/:userid', async (req, res, next) =>{  
  const ob= req.body
  try{
    let query_str=''
    if(req.params.userid!=-1)
      query_str=`select * from comment where f_inquiry_id=${req.params.id} and f_inquiryhandled_id=${req.params.userid}`
    else
     query_str=`select * from comment where f_inquiry_id=${req.params.id}`
    const query = util.promisify(db_conn.query).bind(db_conn)
    const dt=await query(query_str,ob)
    res.status(200).send(dt)
  }catch(error){  
    res.status(500).send(error.sqlMessage)
  }
});
module.exports = route;




