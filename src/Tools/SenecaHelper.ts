import { EnvConfig } from "./ExtentsionTypes";

let seneca = require("seneca");

export default class SenecaHelper
{
    //添加大任务到RabbitMQ
    public static AddTask(taskId: number, config: any, pin: string)
    {
        let client = seneca({legacy:{meta:true}, timeout: 6000000})
                .use('seneca-amqp-transport')
                .client(config);
        client.act(pin, 
            {taskId: taskId}, (err, response)=>{
                if(err) 
                    console.log(err);
                else
                    console.log(response);
            } 
        );
    }
}