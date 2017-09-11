/*
  Module dependencies.
 */
/*
var fs = require('fs');
// fs.readdir(__dirname,function(err,files){
// 	console.log(files);
// });

fs.readdir(process.cwd(), function(err,files){

	console.log(' ');

	if(!files.length){
        return console.log('  033[31 no files to show !\033[39m\n');  //033[31 显示红色
	}

	console.log('select which file or diretory you want to see\n');

	function file(i){
		var filename = files[i];
		//fs.stat 会给出文件或目录的元数据
		fs.stat(__dirname + '/' + filename,function(err,stat){
			if (err) {
	            console.log(err);
	            return; // exit here since stats will be undefined
            }

            if(stat.isDirectory()){
            	console.log('  '+i+'   \033[36m' + filename + '/\033[39m');
            }else{
            	console.log('  '+i+'   \033[90m' + filename + '\033[39m');
            }

            i++;
            if(i == files.length){
            	console.log(' ');
            	process.stdout.write('   \033[33mEnter your choice: \033[39m');
            	//用户等待用户输入
           		process.stdin.resume();
           		//设置流编码
           		process.stdin.setEncoding('utf8');
            } else{
            	//要是还有未处理的，递归调用。
            	file(i);
            }  

		});
	}
	file(0);
});

*///重构
var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;

	fs.readdir(process.cwd(), function(err,files){

		console.log(' ');

		if(!files.length){
	        return console.log('  033[31 no files to show !\033[39m\n');  //033[31 显示红色
		}

		console.log('select which file or diretory you want to see\n');

		function file(i){
			//console.log('111');
			var filename = files[i],
			    stats = [];

			fs.stat(__dirname +'/' + filename, function(err,stat){

				if (err) {
		            console.log(err);
		            return; // exit here since stats will be undefined
          	    }	
          	    stats[i] = stat;

				if (stat.isDirectory()){ //表示的是一个目录则返回true
					console.log('    '+i+  '    '+ filename + '/  1' );
				}else{
					console.log('    '+i+  '    '+  filename +'   2' );
				}
				
				if(++i == files.length){
					read();
				}else{
					file(i);
				}
		    });

			function read(){
				console.log('  ');
				stdout.write( '  \033[33mEnter your choice: \033[39m');
				stdin.resume();
				stdin.setEncoding('utf8');
				//监听data事件
				stdin.on('data', option);//
			}

			function option(data){
				var filename = files[Number(data)];

				if(!filename){
					stdout.write('   \033[31mEnter your chocie: \033[39m');
				}else{
					stdin.pause();

					if(stats[Number(data)].isDirectory()){

						fs.readdir(__dirname + '/' + filename, function(err,files){
							console.log(' ');
							console.log('   (' + files.length + '  files) ' );

							files.forEach( function(file) {
								console.log('   -   ' + file);
							});
							console.log(' ');
						});

					}else{

						fs.readFile(__dirname + '/' + filename, 'utf8',function(err,data){
							console.log(' ');
							console.log(' \033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m' );
						});	

					}
					
				}
			}
		}
		file(0);
	});