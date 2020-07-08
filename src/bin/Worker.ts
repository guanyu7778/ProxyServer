import "reflect-metadata";
let request = require("request");

import { EnvConfig, ScheduleStatus, NextPageAction } from "../Tools/ExtentsionTypes";
import { getConnection, EntityManager } from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
import Proxy_ips from "./Proxy_ips";
import RWIP from "../bin/RWIP";
import {Proxy} from "../entity/Proxy";
let seneca = require('seneca');
enum GETIPType{
   GETIP_1,
   GETIP_2
}
let rwip:RWIP = undefined;//new RWIP();
let whiteList:Array<Proxy> = [];
let blacklist:Array<Proxy> = [];
let proxy_ips=new Proxy_ips();
let getipType=GETIPType.GETIP_2;
//  ORMHelper.CreateConnectionByConfig("proxy").then(async (conn)=>{
//     ORMHelper.connection = conn;
//     console.log("db init");
//     //rwip=new RWIP();
//     //rwip.init();
//     linstener.listen(EnvConfig.AMQP_CONFIG_PROXY);
//  }
//  ).catch();
 let linstener = seneca({legacy:{meta:true}, timeout: 6000000})
    .use('seneca-amqp-transport')
    .add(EnvConfig.AMQP_PROXYPIN, async function(req, done) {
      if(req.whitelist == true) {
         return done(null);
      }
      
      //查询可用的IP地址并返回
      if(req.blacklist == true)
      {
         //添加到黑名单
         let proxy=new Proxy();
         proxy.ip=req.ip;
         proxy.port=req.port;
         proxy.isActive=true;
         proxy.time=new Date();
         blacklist.push(proxy)
         blacklist=unique(blacklist);
         //req.ip req.port
         for (let index = whiteList.length - 1; index >= 0; index--) {
            const element = whiteList[index];
            if(element.ip==req.ip){
               //console.log("whiteList===remove="+element.ip);
               whiteList.splice(index,1);
               break;
            }
         }

      }
      let element=new Proxy();
      if(whiteList.length>0){
         let index: number = Math.floor(Math.random()*whiteList.length - 0.0001);
         if(index < 0) {index = 0;}
         element = whiteList[index];
         return done(null, { ok: true, ip:element.ip, port: element.port});
      }else{
         return done(null, { ok: true, ip:undefined, port: undefined});
      }
    }).listen(EnvConfig.AMQP_CONFIG_PROXY);

setInterval(()=>{
   switch (getipType) {
      case GETIPType.GETIP_1:
         proxy_ips.GetIP_1().then((temp)=>{
            temp=uniqueMove(blacklist,temp);
            if(temp == undefined || temp.length == 0)
            {
               console.log("GETIPType.GETIP_1_temp:"+temp.length+" "+new Date)
               getipType=GETIPType.GETIP_2;
               return;
            }
            whiteList=uniqueArr(whiteList,temp)
            //whiteList = whiteList.concat(temp);
            //console.log("whiteList:"+whiteList.length+"  temp:"+temp.length+" "+new Date)
            if(whiteList.length>60){
               whiteList.splice(0,whiteList.length-60);
               //console.log("whiteList:"+whiteList.length+"   "+new Date)
            }
         });
         break;
      case GETIPType.GETIP_2:
         proxy_ips.GetIP_2().then((temp)=>{
            temp=uniqueMove(blacklist,temp);
            if(temp == undefined || temp.length == 0)
            {
               console.log("GETIPType.GETIP_2_temp:"+temp.length+" "+new Date)
               getipType=GETIPType.GETIP_1;
               return;
            }
            whiteList=uniqueArr(whiteList,temp)
            //whiteList = whiteList.concat(temp);
            //console.log("whiteList:"+whiteList.length+"  temp:"+temp.length+" "+new Date)
            if(whiteList.length>60){
               whiteList.splice(0,whiteList.length-60);
               //console.log("whiteList:"+whiteList.length+"   "+new Date)
            }
         });
         break;
      default:
         break;
   }
},5000)
// function uniqueArr(arr1:any,arr2:any) {
//    //合并两个数组
//    arr1.push(...arr2)//或者arr1 = [...arr1,...arr2]
//    //去重
//    let arr3 = Array.from(new Set(arr1))//let arr3 = [...new Set(arr1)]
//    return arr3;
// }
function uniqueArr(arr1:any,arr2:any){
   var arr3 = arr1.concat(arr2)
   var arr4:Array<Proxy> = [];
   for(var i=0,len=arr3.length; i<len; i++) {
       if(!arr4.find((item)=>{
         return item.ip==arr3[i].ip
         })) {
           arr4.push(arr3[i])
       }
   }
   //console.log(arr4)
   return arr4;
}
function unique(arr1:any){
   var arr4:Array<Proxy> = [];
   for(var i=0,len=arr1.length; i<len; i++) {
       if(!arr4.find((item)=>{
         return item.ip==arr1[i].ip
         })) {
           arr4.push(arr1[i])
       }
   }
   //console.log(arr4)
   return arr4;
}

function uniqueMove(arr1:any,arr2:any){
   var arr4:Array<Proxy> = [];
   for(var i=0,len=arr2.length; i<len; i++) {
       if(!arr1.find((item)=>{
         return item.ip==arr2[i].ip
         })) {
           arr4.push(arr2[i])
       }
   }
   //console.log(arr4)
   return arr4;
}