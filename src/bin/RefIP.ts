import "reflect-metadata";
let request = require("request");
import { EnvConfig, ScheduleStatus, NextPageAction } from "../Tools/ExtentsionTypes";
import { getConnection, EntityManager } from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
import RWIP from "./RWIP";
import {Proxy} from "../entity/Proxy";
let seneca = require('seneca');
let rwip:RWIP = undefined;//new RWIP();
let whiteList:Array<Proxy> = [];
 ORMHelper.CreateConnectionByConfig("proxy").then(async (conn)=>{
    ORMHelper.connection = conn;
    console.log("db init");
    rwip=new RWIP();
    setInterval(() => {
    rwip.RefIP()
    }, 10000);
 }
 ).catch();