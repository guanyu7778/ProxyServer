let request = require("request");
import {Proxy} from "../entity/Proxy";
// interface Proxy{                                       
//     ip:string;
//     port:string;
//   }
export default class Proxy_ips{
    
    async GetIP_1(): Promise<Array<Proxy>>
    {
        let apiURL="https://ip.jiangxianli.com/api/proxy_ips?page=1&country=%E4%B8%AD%E5%9B%BD&order_by=validated_at&order_rule=DESC";
        let options = {
            method: 'GET',
            url: apiURL,
            gzip: true,
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Accept-Encoding': 'gzip, deflate',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
              Host: "ip.jiangxianli.com"
            },
            timeout:2000}
        let p = new Promise<Array<Proxy>>((resolve)=>{
            request(options, async (err, response, datas)=>{
                let proxys:Array<Proxy> = [] ;
                if(err == undefined)
                {   
                    try 
                    {
                        let datass=JSON.parse(datas);
                        if(datass!=undefined && datass.data!=undefined && datass.data.data != undefined){
                            let data=datass.data;
                            data.data.forEach(element => {
                                let proxy=new Proxy();
                                proxy.ip=element.ip;
                                proxy.port=element.port;
                                proxy.isActive=true;
                                proxy.time=new Date();
                                proxys.push(proxy)
                            });
                        }
                        resolve(proxys);
                    } catch (error) {
                        console.log(error+"  "+new Date);
                        resolve(proxys);
                    }
                }
                else
                {
                    resolve(proxys);
                }
            })
            } 
        )
        return p;
    }
    async GetIP_2(): Promise<Array<Proxy>>
    {
        let apiURL="http://121.36.164.82:5010/get_all/";
        let options = {
            method: 'GET',
            url: apiURL,
            gzip: true,
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Accept-Encoding': 'gzip, deflate',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
              Host: apiURL
            },
            timeout:2000}
        let p = new Promise<Array<Proxy>>((resolve)=>{
            request(options, async (err, response, datas)=>{
                let proxys:Array<Proxy> = [] ;
                if(err == undefined)
                {   
                    try 
                    {
                        let datass=JSON.parse(datas);
                        if(datass!=undefined){
                            datass.forEach(index => {
                                let  element=index.proxy;
                                let proxy=new Proxy();
                                proxy.ip=element.split(':')[0];
                                proxy.port=element.split(':')[1];
                                proxy.isActive=true;
                                proxy.time=new Date();
                                proxys.push(proxy)
                            });
                        }
                        resolve(proxys);
                    } catch (error) {
                        console.log(error+"  "+new Date);
                        resolve(proxys);
                    }
                }
                else
                {
                    resolve(proxys);
                }
            })
            } 
        )
        return p;
    }
    // async init() {
    //     return  await this.GetIP();
    //   }
    //   constructor (){
    //     this.init()
    //   }
}

//let proxy_ips=new Proxy_ips();
//let data= proxy_ips.GetIP_2();