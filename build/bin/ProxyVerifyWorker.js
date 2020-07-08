"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let request = require("request");
const ExtentsionTypes_1 = require("../Tools/ExtentsionTypes");
const OrmHelper_1 = require("../Tools/OrmHelper");
const Proxy_1 = require("../entity/Proxy");
let seneca = require('seneca');
let rwip = undefined; //new RWIP();
let whiteList = [];
OrmHelper_1.default.CreateConnectionByConfig("proxy").then(async (conn) => {
    OrmHelper_1.default.connection = conn;
    console.log("db init");
    linstener.listen(ExtentsionTypes_1.EnvConfig.AMQP_CONFIG_PROXY_VER);
}).catch();
let linstener = seneca({ legacy: { meta: true }, timeout: 60000 })
    .use('seneca-amqp-transport')
    .add(ExtentsionTypes_1.EnvConfig.AMQP_PROXY_VER_PIN, async function (req, done) {
    let list = req.ipList;
    await Promise.all(list.map(item => {
        let ip = item.ip;
        let port = item.port;
        //验证ip
        //写数据库
        HttpRequest(ip, port);
    }));
    return done(null);
});
async function AddIP(proxy) {
    let has = await OrmHelper_1.default.connection
        .getRepository(Proxy_1.Proxy).find({
        where: { ip: proxy.ip }
    });
    if (has.length < 1) {
        //console.log("===add==="+proxy.ip + ":" + proxy.port+"======");
        await OrmHelper_1.default.connection.getRepository(Proxy_1.Proxy).save(proxy);
    }
    else {
        for (let index = 0; index < has.length; index++) {
            const element = has[index];
            //console.log("===old==="+element.ip + ":" + element.port+"======");
        }
    }
}
async function HttpRequest(ip, port) {
    try {
        //let por= await portIsOccupied(port);
        let p = new Promise((resolve) => {
            try {
                request({
                    url: "https://www.baidu.com/",
                    method: "get",
                    proxy: "http://" + ip + ":" + port,
                    timeout: 1000
                }, async (err, response, data) => {
                    if (err == undefined) {
                        //console.log("======"+ip + ":" + port+"======"+true);
                        let proxy = new Proxy_1.Proxy();
                        proxy.ip = ip;
                        proxy.port = port;
                        proxy.isActive = true;
                        proxy.time = new Date();
                        if (undefined != this.action) {
                            AddIP(proxy);
                        }
                        resolve(true);
                    }
                    else {
                        //console.log("======"+ip + ":" + port+"======"+false);
                        resolve(false);
                    }
                });
            }
            catch (error) { }
        });
        return p;
    }
    catch (error) {
        console.log(error + " " + new Date);
    }
}
//# sourceMappingURL=ProxyVerifyWorker.js.map