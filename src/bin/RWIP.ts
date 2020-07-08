import HomeController from "../bin/HomeController";
import {Proxy} from "../entity/Proxy";
import {createConnection, getRepository} from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
let  moment=require('moment');
let request = require("request");
let url = 'https://www.xicidaili.com/nn/';
enum URLType{
  "66ip",
  "89ip",
}
export default  class RWIP  {
//start();
async  start(urlType:URLType=URLType["66ip"]){
  try {
    let test= new HomeController(9999,this.AddIP,urlType);
  } catch (error) {
      console.log(error+" "+new Date);
  }
};
init(urlType:URLType=URLType["66ip"]){
  console.log("GetIP===="+URLType[urlType]+" "+new Date);
  this.start(urlType);
  setInterval(() => {
    //console.log("StartUpDataIP"+new Date);
    this.start(urlType)
  }, 60000*1);
  // setInterval(() => {
  //   this.RefIP()
  // }, 10000);
}

async  RemoveIP(ip:string){
  let has = await ORMHelper.connection
                          .getRepository(Proxy).find({
                            where: {ip: ip}
                          });
      if(has.length<1)
      {
      }else{
        for (let index = 0; index < has.length; index++) {
          const element = has[index];
          //await ORMHelper.connection.getRepository(Proxy).remove(element);
          await ORMHelper.connection.getRepository(Proxy).update(element,{isActive:false})
          //console.log("===remove==="+element.ip + ":" + element.port+"======");
        } 
      }
  }
async  AddIP(proxy:Proxy){
let has = await ORMHelper.connection
                        .getRepository(Proxy).find({
                          where: {ip: proxy.ip}
                        });
    if(has.length<1)
    {
      //console.log("===add==="+proxy.ip + ":" + proxy.port+"======");
      await ORMHelper.connection.getRepository(Proxy).save(proxy);
    }else{
      for (let index = 0; index < has.length; index++) {
        const element = has[index];
        //console.log("===old==="+element.ip + ":" + element.port+"======");
      } 
    }
}
async  RefIP(){
  let allIP= await ORMHelper.connection.getRepository(Proxy).find();
  if(allIP.length>0){
    await Promise.all(allIP.map(async item=>{
      let b = await this.HttpRequest(item.ip, item.port);
      if(b == false)
      {
        await ORMHelper.connection.getRepository(Proxy).remove(item);
      }else{
        if(item.isActive){
          let  date=new Date();
          let  date1=moment(item.time);
          let date2=moment(date);
          let date3=date2.diff(date1,'minute');
          if(Math.abs(date3)>60){
             ORMHelper.connection.getRepository(Proxy).update(item,{isActive:false})
          }
        }
      }
    }))
  }
}
async  GetRangeIP():Promise<Proxy>{
  //await this.RefIP();
  let data=await ORMHelper.connection.getRepository(Proxy).find( {
    where: {isActive: true}
  });
  if(data.length>0){
    let index: number = Math.floor(Math.random()*data.length - 0.0001);
    let result = data[index]//await this.TestPILoop(data);
    return result;
  }else{
    let proxy=new Proxy();
               proxy.ip=undefined;
               proxy.port=undefined;
               proxy.isActive=true;
               proxy.time=new Date();
    return proxy;
  }
}
sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async  TestPILoop(pros:Proxy[]): Promise<any>{
  let p= new Promise<any>(async (resolve)=>{
    let tag = true;
    while(tag)
    {
      let index: number = Math.floor(Math.random()*pros.length - 0.0001);
      if(index < 0) index = 0;
      let pro=pros[index];
      let result = await this.HttpRequest(pro.ip, pro.port);
      if(result)
      {
        tag = false;
        resolve(pro);
      }
      else
      {
        await ORMHelper.connection.getRepository(Proxy).remove(pro);
        pros.splice(index, 1);
      }
    }
  });
  return p;
}

HttpRequest(ip, port): Promise<boolean>
{
  try {
    let p = new Promise<boolean>((resolve)=>{
      request({
        url: "https://www.baidu.com/",
        method: "get",
        proxy:"http://"+ip + ":" + port
      }, async (err, response, data)=>{
        if(err == undefined)
        {
          resolve(true);
        }
        else
        {
          resolve(false);
        }
      })
      //setTimeout(() => reject('error'), 500);
    })
    return p;
  } catch (error) {
    console.log(error)
  }
  
}

async  TestPI(pro:Proxy): Promise<any>{
  if(undefined==pro){
    return false;
  }
  request({
    url: "https://www.baidu.com/",
    method: "get",
    proxy:"http://"+pro.ip + ":" + pro.port
  }, (err, response, data)=>{
    if(err == undefined)
    {
      if(pro.time==undefined){
        ORMHelper.connection.getRepository(Proxy).update(pro,{isActive:false})
      }else{
        let  date=new Date();
        let  date1=moment(pro.time);
        let date2=moment(date);
        let date3=date2.diff(date1,'minute');
        if(Math.abs(date3)>60){
           ORMHelper.connection.getRepository(Proxy).update(pro,{isActive:false})
        }
      }
      return true;
    }
    else
    {
      //console.log("===remove==="+pro.ip + ":" + pro.port);
      ORMHelper.connection.getRepository(Proxy).remove(pro);
      return false;
    }
  });
  }
  constructor (ipCount = 100,action:any=undefined){
    //this.init();
  }
}

