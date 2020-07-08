
import { resolve } from "url";
import { response } from "express";
import { truncateSync } from "fs";
import { group } from "console";
import { on } from "process";
let request = require("request");
const gaxios = require('gaxios');
var cheerio=require('cheerio');
const iconv = require('iconv-lite')
let url = 'https://www.xicidaili.com/nn/';
//let url = 'https://www.baidu.com/';
//定义titleArr里面对象数据的类型
interface IPAndPort{                                       
  IP:string;
  Port:string;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


// process.on("uncaughtException", ()=>{
//   console.log("捕获异常");
// });

export default class Reptile{

    private url = '';
    private page=1;
    private action=undefined;
    private IPPort:Array<IPAndPort> = [] ;
    //请求到url里面的内容
    async getHtml(){
      //发送请求使用superagent，需要安装一下
      //npm install superagent -D
      // axios 配置
      // HTTP, HTTPS, or SOCKS proxy to use
      var proxy = 'http://121.36.164.82:807';
      try {
      return new Promise<any>((resolve, reject) => {
        request({
          url: this.url,
          method: "get",
          //proxy:'http://127.0.0.1:10809',
          timeout: 1000
        }, (err, response, data)=>{
          if(err == undefined)
          { 
            resolve(data);
          }
          else
          { 
            sleep(1000)
            console.log(err);
            resolve(false);
          }
        }).on('err', function (e) {
          sleep(1000)
          console.log("Err;"+e);
          resolve(false);
      });});
      } catch (error) {
        await sleep(1000)
        return undefined;
      }
    }
    async getJsonInfo(html:any){
      let $=cheerio.load(html);
      let item= $('.odd');
      //定义一个数组，存放数据
      //拿里面的数据
      for(let i =0; i < item.length; i++)
      {
       
        try{
          let ele = item[i];
          const ip = $(ele).find('td').eq(1).text();					  //第八步，通过find方法拿到td标签
          const port = $(ele).find('td').eq(2).text();
          let result = this.TestPI(ip,port);
          if(result)
          {
            //console.log("ip:"+ip+"  port:"+port);
            //根据设计的数据结构做数据整合
            
          }
        }catch(e)
        {
          console.log( e)
        }
      }
      return {                                              //第十一步，再设计数据结构，并且返回需要的样子
        time: new Date().getTime(),
        data:this.IPPort
      }
    }
    //初始化
    async init(){
       const html = await this.getHtml()
       const jsonInso =  await this.getJsonInfo(html);
       //console.log("========================================================");
       //console.log(jsonInso);
      //  if(this.action!=undefined){
      //   this.action(jsonInso);
      //  }
       
    }
    TestPI(IP:string,port:string): Promise<any>{
      try {
        return new Promise<any>((resolve, reject) => {
          require("request")({
            url: "https://www.baidu.com",
            method: "get",
            proxy:"http://"+IP + ":" + port,
            timeout: 1000
          }, (err, response, data)=>{
            if(err == undefined)
            { 
              //console.log("=========true========="+IP+":"+port);
              this.IPPort.push({
                IP:IP,
                Port:port}
              )
              if(this.action!=undefined){
                this.action({
                  IP:IP,
                  Port:port});
               }
              resolve(true);
            }
            else
            { 
              //console.log("false=="+IP+":"+port+" E:"+err);
              resolve(false);
            }
          }).on('err', function (e) {
            console.log("false=="+IP+":"+port+" E:"+e);
            resolve(false);
        });
        });
      } catch (error) {
        console.log("error=="+error);
      }
      
    }
    constructor (url:string,page:number,action:any=undefined){
      this.url=url+page;
      this.page=page;
      this.action=action;
      console.log("===========================page:"+page.toString()+"============================");
      this.init()
    }
  
  }

  //new一下就是实例化，就会执行类里面的constraintor方法
  
  //let test= new Reptile(url, 1);
  //console.log('https://www.xicidaili.com/wn/');