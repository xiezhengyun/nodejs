var net = require('net');

////追踪连接数
var count = 0,
    users = {};
    
//创建服务器
var server = net.createServer(function(conn){
	//handle connection
	
	var nickname;
	conn.setEncoding('utf8');

	conn.write(
        ' > welcome to miode-chat \r\n' 
      +  ' >' + count + ' other people are connected at this time \r\n' 
      + ' > please write your name and press enter: ' 
	);//输出在客户端

	count++;

	conn.on('data', function(data) {

		data = data.replace('\r\n','');
		console.log(data);//输出在服务端

 //接收到的第一份数据，是用户书输入的昵称
		if(!nickname){
			if(users[data]){
				conn.write(' nickname already in use. try again: \r\n');
				return;
			}else{
				nickname = data;
				users[nickname] = conn;

				// for (var i in users ) {
				// 	users[i].write(' \r\n > ' + nickname + ' joined the room \r\n');
				// }
				broadcast(' \r\n > ' + nickname + ' joined the room \r\n');
			}
		}else{
			//否则视为聊天消息
			// for (var i in  users ) {
			// 	//确保消息只发送给除自己以外的其他客户端
			// 	if(i != nickname){
			// 		users[i].write( ' > ' + nickname +  ' say: ' + data + '\r\n');
			// 	}
			// }
			broadcast(' > ' + nickname +  ' say: ' + data + '\r\n',true)
		}		
	});

	conn.on('close', function() {
		count--;
		delete users[nickname];
		broadcast(' > ' + nickname + ' left the room \r\n');
	});

	//向用户广播消息
	function broadcast( msg, excepMyself){
		for(var i in users){
			if(!excepMyself || i != nickname){
				users[i].write(msg);
			}
		}
	}
});



//监听
server.listen(3003, function(){
	console.log('server listening on *: 3003');
});
