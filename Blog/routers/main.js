/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 16:12:42
 * @version $Id$
 */

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
	res.render('main/index');
});

module.exports = router;