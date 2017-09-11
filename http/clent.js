
	var http = require('http'),
	    qs = require('querystring');
	function send (theName){
	    http.request({
		host: '127.0.0.1',
		port: 3000,
		url: '/',
		method: 'POST'    	
	    },function(res){
	    	res.setEncoding('utf8');
	    	res.on('end',function(){
	    		console.log('\n request complete');
	    		process.stdout.write('\n name: theName');
	    	});
	    }).end(qs.stringify({name: theName}));
	}
    
    process.stdout.write('\n your name: ');
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data',function(name){
    	send(name.replace('\n',' '));
    });
