//事件监听
var EventEmitter = require('events').EventEmitter,
               a = new EventEmitter;
a.on('event',  function() {
	console.log('event called');
});
a.emit('event');

//用户提交表单，监听请求的data和end事件
http.Server(function(req,res){
	var buf = ' ';
	req.on('data',function(data){
		buf += data;
	});

	req.on('end',function(){
		console.log('数据接受完毕');
	});
	//req.once()只执行一次
});