"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let request = require("request");
const OrmHelper_1 = require("../Tools/OrmHelper");
const RWIP_1 = require("./RWIP");
let seneca = require('seneca');
let rwip = undefined; //new RWIP();
let whiteList = [];
OrmHelper_1.default.CreateConnectionByConfig("proxy").then(async (conn) => {
    OrmHelper_1.default.connection = conn;
    console.log("db init");
    rwip = new RWIP_1.default();
    setInterval(() => {
        rwip.RefIP();
    }, 10000);
}).catch();
//# sourceMappingURL=RefIP.js.map