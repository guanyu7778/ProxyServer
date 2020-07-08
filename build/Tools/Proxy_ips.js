"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let request = require("request");
const Proxy_1 = require("../entity/Proxy");
// interface Proxy{                                       
//     ip:string;
//     port:string;
//   }
class Proxy_ips {
    constructor() {
        this.proxys = [];
    }
    async GetIP() {
        let apiURL = "https://ip.jiangxianli.com/api/proxy_ips?page=1&country=中国&order_by=validated_at&order_rule=DESC";
        let options = {
            method: 'GET',
            url: apiURL,
        };
        let datas = await request(options);
        if (datas != undefined) {
            if (datas.data != undefined) {
                if (datas.data.data != undefined) {
                    for (let index = 0; index < datas.data.data.length; index++) {
                        const element = datas.data.data[index];
                        let proxy = new Proxy_1.Proxy();
                        proxy.ip = element.ip;
                        proxy.port = element.port;
                        proxy.isActive = true;
                        proxy.time = new Date();
                        this.proxys.push(proxy);
                    }
                    return this.proxys;
                }
                return this.proxys;
            }
            return this.proxys;
        }
        return this.proxys;
    }
}
exports.default = Proxy_ips;
let data = new Proxy_ips().GetIP();
console.log(data);
//# sourceMappingURL=Proxy_ips.js.map