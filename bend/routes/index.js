var express = require('express');
var router = express.Router();

var path = require('path');
router.get('/guest', function(req, res, next) {
  // 
  // res.send("Done")
  res.sendFile(path.join(__dirname, '../public/build/', 'index.html'));
});
module.exports = router;






