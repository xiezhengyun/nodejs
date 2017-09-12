/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 16:12:24
 * @version $Id$
 */

var express = require('express');
var router = express.Router();
var User = require('../models/User')

//统一返回格式
var responseData;
router.use(function(req, res, next){
	responseData = {
		code: 0,
		message: ''
	}
	next();
})


//用户注册  注册逻辑
//1.基本验证  2.用户名是否已经被注册
router.post('/user/register',function(req, res, next){
	//console.log(req.body); 
	var userbane = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	//判断用户名是否为空
	if( username = ''){
		responseData.code = 1;
		responseData.message = '用户名不能为空'；
		res.json(responseData);
		return;
	}
	//密码不能为空
	if( password = ''){
		responseData.code = 2;
		responseData.message = '密码不能为空'；
		res.json(responseData);
		return;		
	}	
	//两次输入的密码必须一致
	if( password ！= repassword){
		responseData.code = 3;
		responseData.message = '两次输入的密码不一致'；
		res.json(responseData);
		return;		
	}

	//用户名是否已经被注册，数据库查询
	User.findOne({
		username: username
	}).then(function( userInfo ){
		//console.log(userInfo);
			 
		if(userInfo){
			//表示数据库中有该记录
			responseData.code = 4;
			responseData.message = '用户名已经被注册了'；
			res.json(responseData);
			return;
		}
		//保存用户注册的信息到数据库中  save方法
		var user = new User({
			username: username,
			password: password
		});
		return user.save();
    }).then(function( newUserInfo ){
    	console.log(newUserInfo);
		responseData.message = '注册成功'；
		res.json( responseData );    	
    });
});

//用户登陆
router.post('/user/login',function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	if( username == '' || password == ''){
		responseData.code = 1;
		responseData.message = '用户名和密码不能为空'；
		res.json(responseData);
		return;
	}

	//数据库中查询相关信息是否存在
	User.findOne({
		username: username,
		password: password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 2;
			responseData.message = '用户名或密码错误'；
			res.json(responseData);
			return;
		}
		//用户名和密码正确
		responseData.message = '登陆成功'；
		responseData.userInfo = {
			id: userInfo.id,
			username: userInfo.username
		}
		res.json(responseData);
		return;
	})
})

module.exports = router;