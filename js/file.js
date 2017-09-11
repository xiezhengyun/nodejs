//阻塞代码
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log('程序执行结束1');

//非阻塞代码
var fs2 = require('fs');
fs.readFile('input.txt',function(err,data){
    if(err) return console.error(err);
    console.log(data.toString());
});
console.log("程序执行结束2");
//阻塞是按顺序执行的，而非阻塞是不需要按顺序的
//所以处理回调函数的参数，我们就需要写在回调函数内