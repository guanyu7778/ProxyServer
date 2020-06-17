"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = require("node-schedule");
class TaskService {
    static get Instance() {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }
    /**  *  *  *  *  *
    ┬ ┬ ┬ ┬ ┬ ┬
    │ │ │ │ │  |
    │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    │ │ │ │ └───── month (1 - 12)
    │ │ │ └────────── day of month (1 - 31)
    │ │ └─────────────── hour (0 - 23)
    │ └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)*/
    Schedule(rule, jobCallback) {
        node_schedule_1.cancelJob("search");
        node_schedule_1.scheduleJob("search", rule, jobCallback);
    }
}
exports.default = TaskService;
//# sourceMappingURL=TaskService.js.map