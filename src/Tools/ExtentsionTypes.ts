export enum ScheduleStatus
{
    Idle = "等待中",
    Runing = "运行中",
    End = "已经结束",
    Failed = "失败"
}

export enum PageActionType
{
    Goto = "Goto",
    Input = "Input",
    Click = "Click"
}

export enum PageActionOrder
{
    Before = "before",
    Later = "later"
}

export class NextPageAction
{
    nextPageUrl = "";
    actionRuleName = "";
    code: string = "";
    codeArgs: string = "";
}

export class EnvConfig
{
    public static BROWSER_PATH: string = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
    public static BROWSER_HEADLESS: boolean = false;
    public static AMQP_TASKPIN: string = "cmd:task_test, type:sche";
    public static AMQP_PROXYPIN: string = "cmd:proxy_test, type:sche";
    public static AMQP_PROXY_VER_PIN: string = "cmd:proxy_verifytest, type:work";
    public static AMQP_CONFIG_TASK = {
        type: 'amqp',
        hostname: '121.36.145.84',
        port: 5672,
        username: 'guest',
        password: 'guanyu65',
        pin: EnvConfig.AMQP_TASKPIN
    };
    public static AMQP_CONFIG_PROXY = {
        type: 'amqp',
        hostname: '121.36.145.84',
        port: 5672,
        username: 'guest',
        password: 'guanyu65',
        pin: EnvConfig.AMQP_PROXYPIN
    };
    public static AMQP_CONFIG_PROXY_VER = {
        type: 'amqp',
        hostname: '121.36.145.84',
        port: 5672,
        username: 'guest',
        password: 'guanyu65',
        pin: EnvConfig.AMQP_PROXY_VER_PIN
    };
}