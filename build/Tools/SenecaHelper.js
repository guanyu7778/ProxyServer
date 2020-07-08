"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtentsionTypes_1 = require("./ExtentsionTypes");
let seneca = require("seneca");
class SenecaHelper {
    static AddProxyVerifyTask(iplist) {
        let client = seneca({ legacy: { meta: true }, timeout: 6000, log: { level: 'warn+' } })
            .use('seneca-amqp-transport')
            .client(ExtentsionTypes_1.EnvConfig.AMQP_CONFIG_PROXY_VER);
        client.act(ExtentsionTypes_1.EnvConfig.AMQP_PROXY_VER_PIN, { ipList: iplist });
    }
}
exports.default = SenecaHelper;
//# sourceMappingURL=SenecaHelper.js.map