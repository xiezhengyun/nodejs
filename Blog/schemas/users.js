/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 16:39:13
 * @version $Id$
 */

var mongoose = require('mongoose');

//用户的表结构
module.exports =  new mongoose.Schema({

	//用户名
	username: String,
	//密码
	password: String
});