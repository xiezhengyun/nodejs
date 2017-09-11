/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 16:11:52
 * @version $Id$
 */
var express = require('express');
var router = express.Router();

router.get('/user',function(req, res, next){
	res.send('admin-User');
});

module.exports = router;