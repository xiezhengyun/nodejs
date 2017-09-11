//应用程序启动入口文件
//加载express模块
var express = require('express');
//加载模板
var swig = require('swig');

//创建app应用 => NodeJs Http.createServer();
var app = express();

//设置静态文件托管   如css img
//当用户访问的url以/public开始，那么直接返回对应目录__dirname + '/public'下的文件
app.use('/public', express.static( __dirname + '/public' ));

//配置模板
//定义当前应用所使用的模板引擎。第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文案存放的目录。第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎。第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的。
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存,更改模板视图，无需重启应用
swig.setDefaults({cache: false});

//根据不同的功能，划分模块

app.use('/admin', require('./routers/admin'));

app.use('/api', require('./routers/api'));

app.use('/', require('./routers/main'))











// /*
//   首页
//   req  request对象
//   res  response对象
//   next  函数
//  */
// app.get('/',function(req, res, next){
// 	//res.send('<h1>欢迎光临我的博客</h1>');
	
// 	  读取views目录下的指定文件，解析并返回给客户端
// 	  第一个参数：表示模板的文件，相对于views目录  views/index.html
// 	  第二个参数：传递给模板使用的数据
	 
// 	res.render('index');
// });
// /*
// 	app.get('/main.css', function(req, res, next){
// 		res.setHeader('content-Type','text/css');
// 		res.send("body {background : red;}");
// 	})
// */
//监听http请求
app.listen(8081);

/*
    1.用户发送http请求
    2.url
    3.解析路由
    4.找到匹配的规则
    5.执行指定绑定函数，返回对应的内容至用户

    /public -> 静态 -> 直接读取指定目录下的文件，返回给用户
    其他(动态文件) -> 处理业务逻辑，加载模板，解析模板 -> 返回数据给用户
 */