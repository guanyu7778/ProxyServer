import "reflect-metadata";
import { EnvConfig, ScheduleStatus, NextPageAction } from "../Tools/ExtentsionTypes";
import { getConnection, EntityManager } from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
import SenecaHelper from "../Tools/SenecaHelper";
let seneca = require('seneca');
 ORMHelper.CreateConnectionByConfig("schedule").then((conn)=>{
    ORMHelper.connection = conn;
    console.log("db init");
    linstener.listen(EnvConfig.AMQP_CONFIG_TASK);
 }
 ).catch();

 let linstener = seneca({legacy:{meta:true}, timeout: 6000000})
    .use('seneca-amqp-transport')
    .add(EnvConfig.AMQP_TASKPIN, async function(req, done) {
        //查找task
        return done(null, { ok: true});
    })