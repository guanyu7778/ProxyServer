import { EnvConfig } from "./ExtentsionTypes";

let seneca = require("seneca");
export default class SenecaHelper
{
    public static AddProxyVerifyTask(iplist: Array<any>)
    {
        let client = seneca({legacy:{meta:true}, timeout: 6000, log: { level: 'warn+' }})
                .use('seneca-amqp-transport')
                .client(EnvConfig.AMQP_CONFIG_PROXY_VER);
        client.act(EnvConfig.AMQP_PROXY_VER_PIN,  {ipList: iplist});
    }
}