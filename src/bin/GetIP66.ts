import "reflect-metadata";
let request = require("request");
import { EnvConfig, ScheduleStatus, NextPageAction } from "../Tools/ExtentsionTypes";
import { getConnection, EntityManager } from "typeorm";
import ORMHelper from "../Tools/OrmHelper";
import RWIP from "./RWIP";
import {Proxy} from "../entity/Proxy";
let seneca = require('seneca');
let rwip:RWIP = undefined;//new RWIP();
enum URLType{
   "66ip",
   "89ip",
 }
let whiteList:Array<Proxy> = [];
 ORMHelper.CreateConnectionByConfig("proxy").then(async (conn)=>{
    ORMHelper.connection = conn;
    console.log("db init");
    rwip=new RWIP();
    rwip.init(URLType["89ip"]);
 }
 ).catch();