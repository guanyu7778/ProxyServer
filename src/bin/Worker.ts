import "reflect-metadata";
import { EnvConfig, ScheduleStatus, NextPageAction } from "../Tools/ExtentsionTypes";
import { getConnection, EntityManager } from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
let seneca = require('seneca');
 ORMHelper.CreateConnectionByConfig("proxy").then((conn)=>{
    ORMHelper.connection = conn;
    console.log("db init");
    linstener.listen(EnvConfig.AMQP_CONFIG_TASK);
 }
 ).catch();

 let linstener = seneca({legacy:{meta:true}, timeout: 6000000})
    .use('seneca-amqp-transport')
    .add(EnvConfig.AMQP_CONFIG_PROXY, async function(req, done) {
        //查询可用的IP地址并返回
        return done(null, { ok: true, ip:"127.0.0.1", port: 808});
    })