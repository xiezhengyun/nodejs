
    var http = require('http'),
	    qs = require('querystring'),
	    search = process.argv.slice(2).join(' ').trim();
	if(!search.length){
		return console.log('\n Usage: node tweets<srearch term>\n ');
	} 
	console.log('\n searching for: '+ search );
	http.request({
		host: 'search.twitter.com',
		path: '/search.json' + qs.stringify({q: search})
	},function(res){
		var body = '';
        res.setEncoding('utf8');
        res.on('data',function(chunk){
        	body += chunk;
        });
        res.on('end',function(){
        	var obj = JSOn.parse(body);
        	obj.resule.forEach( function(tweet) {
        		console.log(' tweet.text ');
        		console.log('tweet.form_user');
        		console.log('--');
        	});
        });
	}).end();