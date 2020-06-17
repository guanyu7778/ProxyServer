"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let seneca = require("seneca");
class SenecaHelper {
    //添加大任务到RabbitMQ
    static AddTask(taskId, config, pin) {
        let client = seneca({ legacy: { meta: true }, timeout: 6000000 })
            .use('seneca-amqp-transport')
            .client(config);
        client.act(pin, { taskId: taskId }, (err, response) => {
            if (err)
                console.log(err);
            else
                console.log(response);
        });
    }
}
exports.default = SenecaHelper;
//# sourceMappingURL=SenecaHelper.js.map