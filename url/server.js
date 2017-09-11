var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


var server = http.createServer();
//路径
var htmlDir = __dirname + '/html/';

server.on('request',  function(req,res) {
	//处理url
	var urlStr = url.parse( req.url );

	switch ( urlStr.pathname ) {
		case '/':
			// 网站首页
			sendData( htmlDir + 'index.html', req, res );
			break;

		case '/user':
		    //个人中心
			sendData( htmlDir + 'user.html', req, res );	
			break;	

		case '/login':
		    //登录
			sendData( htmlDir + 'login.html', req, res );	
			break;			    
 
        case '/login/check':
		    //登录检查
		    // console.log(req.method);
		    // console.log(urlStr);
		   // console.log( qs.parse(urlStr.query) );
			if(req.method.toUpperCase() == "POST"){

				var str = ' ';
				req.on('data', function(chunk) {
					str += chunk;
				});
				req.on('end',function(){
					console.log(str);
					console.log(qs.parse(str));
				})
			}
			break; 

		default:
			//错误网址
			sendData( htmlDir + 'error.html', req, res );			
			break;
	}
});

//读取文件
function sendData(file, req, res){

    fs.readFile(file,  function(err,data){

    	if(err){
			res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
			res.end('<h1>页面找不到</h1>');	
    	}else{
			res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
			res.end(data);
    	}
    })
}




server.listen(8080);
