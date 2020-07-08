const net=require('net')
export default  function portIsOccupied (port){
    const server=net.createServer().listen(port)
    return new Promise((resolve)=>{
        server.on('listening',()=>{
            //console.log(`the server is runnint on port ${port}`)
            server.close()
            resolve(port)
        })
        server.on('error',(err)=>{
            if(err.code==='EADDRINUSE'){
                //resolve(portIsOccupied(port+1))//注意这句，如占用端口号+1
              setTimeout(() => {
                killport(port);
                server.close();
                resolve(port);
              }, 2500);  
                //console.log(`this port ${port} is occupied.try another.`)
            }else{
                //reject(err)
            }
        })
    })
}
function killport(port){
    var order='lsof -i :'+port;
var exec = require('child_process').exec;
var qqname='shuai';
exec(order, function(err, stdout, stderr) {
    if(err){ return console.log(err); }
    stdout.split('\n').filter(function(line){
        var p=line.trim().split(/\s+/);
        var address=p[1];
        if(address!=undefined && address!="PID"){
            exec('kill '+ address,function(err, stdout, stderr){
                    if(err){
                        return console.log('释放指定端口失败！！');
                    }
                    console.log('占用指定端口的程序被成功杀掉！');
                });
        }
    });
});
}