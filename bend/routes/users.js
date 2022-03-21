var express = require('express');
var router = express.Router();


const db_conn= require("../database")
/* GET users listing. */
router.get('/', function(req, res, next) {
  if(db_conn)
  {
    db_conn.query('SELECT * from item_detail', (err, rows, fields) => {
      if (err) throw err
        res.send(rows)

    })
  }
  else
    res.send("----")
});
router.get('/test',(req,res,next)=>{
  let count=10
  res.send(`<h1>Hello There ${count}</h1>`)
  
})
module.exports = router;
