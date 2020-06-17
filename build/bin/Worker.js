"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ExtentsionTypes_1 = require("../Tools/ExtentsionTypes");
const OrmHelper_1 = require("../Tools/OrmHelper");
let seneca = require('seneca');
OrmHelper_1.default.CreateConnectionByConfig("proxy").then((conn) => {
    OrmHelper_1.default.connection = conn;
    console.log("db init");
    linstener.listen(ExtentsionTypes_1.EnvConfig.AMQP_CONFIG_TASK);
}).catch();
let linstener = seneca({ legacy: { meta: true }, timeout: 6000000 })
    .use('seneca-amqp-transport')
    .add(ExtentsionTypes_1.EnvConfig.AMQP_CONFIG_PROXY, async function (req, done) {
    //查询可用的IP地址并返回
    return done(null, { ok: true, ip: "127.0.0.1", port: 808 });
});
//# sourceMappingURL=Worker.js.map