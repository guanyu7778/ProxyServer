"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let request = require("request");
const OrmHelper_1 = require("../Tools/OrmHelper");
const RWIP_1 = require("./RWIP");
let seneca = require('seneca');
let rwip = undefined; //new RWIP();
var URLType;
(function (URLType) {
    URLType[URLType["66ip"] = 0] = "66ip";
    URLType[URLType["89ip"] = 1] = "89ip";
})(URLType || (URLType = {}));
let whiteList = [];
OrmHelper_1.default.CreateConnectionByConfig("proxy").then(async (conn) => {
    OrmHelper_1.default.connection = conn;
    console.log("db init");
    rwip = new RWIP_1.default();
    rwip.init(URLType["66ip"]);
}).catch();
//# sourceMappingURL=GetIP89.js.map