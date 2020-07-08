"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = exports.NextPageAction = exports.PageActionOrder = exports.PageActionType = exports.ScheduleStatus = void 0;
var ScheduleStatus;
(function (ScheduleStatus) {
    ScheduleStatus["Idle"] = "\u7B49\u5F85\u4E2D";
    ScheduleStatus["Runing"] = "\u8FD0\u884C\u4E2D";
    ScheduleStatus["End"] = "\u5DF2\u7ECF\u7ED3\u675F";
    ScheduleStatus["Failed"] = "\u5931\u8D25";
})(ScheduleStatus = exports.ScheduleStatus || (exports.ScheduleStatus = {}));
var PageActionType;
(function (PageActionType) {
    PageActionType["Goto"] = "Goto";
    PageActionType["Input"] = "Input";
    PageActionType["Click"] = "Click";
})(PageActionType = exports.PageActionType || (exports.PageActionType = {}));
var PageActionOrder;
(function (PageActionOrder) {
    PageActionOrder["Before"] = "before";
    PageActionOrder["Later"] = "later";
})(PageActionOrder = exports.PageActionOrder || (exports.PageActionOrder = {}));
class NextPageAction {
    constructor() {
        this.nextPageUrl = "";
        this.actionRuleName = "";
        this.code = "";
        this.codeArgs = "";
    }
}
exports.NextPageAction = NextPageAction;
class EnvConfig {
}
exports.EnvConfig = EnvConfig;
EnvConfig.BROWSER_PATH = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
EnvConfig.BROWSER_HEADLESS = false;
EnvConfig.AMQP_TASKPIN = "cmd:task_test, type:sche";
EnvConfig.AMQP_PROXYPIN = "cmd:proxy_test, type:sche";
EnvConfig.AMQP_PROXY_VER_PIN = "cmd:proxy_verifytest, type:work";
EnvConfig.AMQP_CONFIG_TASK = {
    type: 'amqp',
    hostname: '121.36.145.84',
    port: 5672,
    username: 'guest',
    password: 'guanyu65',
    pin: EnvConfig.AMQP_TASKPIN
};
EnvConfig.AMQP_CONFIG_PROXY = {
    type: 'amqp',
    hostname: '121.36.145.84',
    port: 5672,
    username: 'guest',
    password: 'guanyu65',
    pin: EnvConfig.AMQP_PROXYPIN
};
EnvConfig.AMQP_CONFIG_PROXY_VER = {
    type: 'amqp',
    hostname: '121.36.145.84',
    port: 5672,
    username: 'guest',
    password: 'guanyu65',
    pin: EnvConfig.AMQP_PROXY_VER_PIN
};
//# sourceMappingURL=ExtentsionTypes.js.map