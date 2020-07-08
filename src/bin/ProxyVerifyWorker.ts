import "reflect-metadata";
let request = require("request");
import { EnvConfig, ScheduleStatus, NextPageAction } from "../Tools/ExtentsionTypes";
import { getConnection, EntityManager } from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
import RWIP from "../bin/RWIP";
import {Proxy} from "../entity/Proxy";
let seneca = require('seneca');
let rwip:RWIP = undefined;//new RWIP();
let whiteList:Array<Proxy> = [];
 ORMHelper.CreateConnectionByConfig("proxy").then(async (conn)=>{
    ORMHelper.connection = conn;
    console.log("db init");
    linstener.listen(EnvConfig.AMQP_CONFIG_PROXY_VER);
 }
 ).catch();

 let linstener = seneca({legacy:{meta:true}, timeout: 60000})
    .use('seneca-amqp-transport')
    .add(EnvConfig.AMQP_PROXY_VER_PIN, async function(req, done) {
        let list: Array<any> = req.ipList;
        await Promise.all(list.map(item=>{
            let ip = item.ip;
            let port = item.port;
            //验证ip
            //写数据库
            HttpRequest(ip,port);
        }))
        return done(null);
    })
async function  AddIP(proxy:Proxy){
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
async function HttpRequest(ip, port): Promise<boolean>
    {
      try {
        //let por= await portIsOccupied(port);
        let p = new Promise<boolean>((resolve)=>{
            try {
              request({
                url: "https://www.baidu.com/",
                method: "get",
                proxy:"http://"+ip + ":" + port,
                timeout:1000
              }, async (err, response, data)=>{
                if(err == undefined)
                {
                  //console.log("======"+ip + ":" + port+"======"+true);
                  let proxy=new Proxy();
                  proxy.ip=ip;
                  proxy.port=port;
                  proxy.isActive=true;
                  proxy.time=new Date();
                  if(undefined!=this.action){
                    AddIP(proxy);
                  }
                  resolve(true);
                }
                else
                {
                  //console.log("======"+ip + ":" + port+"======"+false);
                  resolve(false);
                }
              })
            } catch (error) {}})
        return p;
      } catch (error) {
        console.log(error+" "+new Date)
      }
    }