var express = require('express');
var router = express.Router();

const testdb= require('../database')

router.get('/', function(req, res, next) {
    var sql='SELECT * FROM item_detail';
    
    testdb.query(sql, function (err, raws, fields) {
    if (err) throw err
    res.send(raws)
   
   
  });
});
module.exports = router;