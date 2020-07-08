const Controller = require('egg').Controller
const iconv = require('iconv-lite')
const rp = require('request-promise')
import axios from 'axios';
var request = require("request")
import SenecaHelper from "../Tools/SenecaHelper";
import {Proxy} from "../entity/Proxy";
//extends Controller
process.on("uncaughtException", ()=>{
  //console.log("");
});

enum URLType{
  "66ip",
  "89ip",
  "ihuan",
}
export default class HomeController  {
  /**
   * 抓取代理IP
   * @param {number} [ipCount=100] 代理数量
   * @return {array} 抓取回来的代理列表
   */
  
  private action=undefined;
  async get66ipData(ipCount = 100,urlType:URLType=URLType["66ip"]) {
    try {
      let apiURL,referer,Host;
      // 抓取的页面地址
      switch (urlType) {
        case URLType["66ip"]:
          apiURL = `http://www.66ip.cn/nmtq.php?getnum=${ipCount}&isp=0&anonymoustype=0&start=&ports=&export=&ipaddress=&area=0&proxytype=2&api=66ip`
          referer='http://www.66ip.cn/';
          Host='www.66ip.cn';
          break;
          case URLType["89ip"]:
            apiURL = `http://www.89ip.cn/tqdl.html?api=1&num=${ipCount}&port=&address=&isp=`
            //apiURL = `https://ip.ihuan.me/tqdl.html?api=1&num=${ipCount}&port=&kill_port=&address=&kill_address=&anonymity=2&type=&post=&sort=`
            referer='http://www.89ip.cn/';
            Host='www.89ip.cn';
            break;
          case URLType["ihuan"]:
            if(ipCount>3000){
              ipCount=3000;
            }
            apiURL = `https://ip.ihuan.me/tqdl.html/`
            referer='https://ip.ihuan.me/ti.html/';
            Host='https://ip.ihuan.me/';
            break;
        default:
          break;
      }  
      // 设置HTTP请求参数
      let options;
      switch (urlType) {
        case URLType["66ip"]:
        case URLType["89ip"]:
          options = {
            method: 'GET',
            url: apiURL,
            timeout:2000,
            gzip: true,
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Encoding': 'gzip, deflate',
              'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
              referer: referer,
              Cookie:
                '__cfduid=d9d801abc67718d98c4886083838f8b2d1592553636; cf_chl_1=6ea3a775ea35da0; statistics=6aa22f8afb172793f3803c076764d327; Hm_lvt_8ccd0ef22095c2eebfe4cd6187dea829=1592553640,1593485279,1593485316,1593500741; Hm_lpvt_8ccd0ef22095c2eebfe4cd6187dea829=1593501292',
              Host: Host
            }
          }
          break;
        case URLType["ihuan"]:
          options = {
            method: 'POST',
            url: apiURL,
            timeout:2000,
            gzip: true,
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Accept-Encoding': 'gzip, deflate',
              'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
              referer: referer,
              Cookie:
                '__cfduid=d9d801abc67718d98c4886083838f8b2d1592553636; cf_chl_1=6ea3a775ea35da0; statistics=6aa22f8afb172793f3803c076764d327; Hm_lvt_8ccd0ef22095c2eebfe4cd6187dea829=1592553640,1593485279,1593485316,1593500741; Hm_lpvt_8ccd0ef22095c2eebfe4cd6187dea829=1593501292',
              Host: Host
            },
            source:{
              num:ipCount,
              port: "",
              kill_port: "",
              address: "",
              kill_address: "",
              anonymity:2,
              type: "",
              post: "",
              sort: "",
              key:"9046360cedc155203629537d9f809005",
            }
          }
            break;
        default:
          break;
      }
      
      // 发出http请求
      let data = await rp(options,(err,rep,data)=>{if(err != undefined){console.log(err)}})
      iconv.skipDecodeWarning = true;
      // 如果是 gbk ，则使用icnov 来转
      // node环境不支持 gbk,因此会乱码
      if (/meta.+charset=gbk/i.test(data)) {
        data = iconv.decode(data, 'gbk')
      }

      // 清洗出代理ip
      const proxyList = data.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g)
      // 把数据解析成约定的格式（数据库的格式）
      let newList = [],tempArr = [];
      for (let index = 0; index < proxyList.length; index++) {
        const element = proxyList[index];
        if(index%10==0){
          tempArr.push(element);
          newList.push(tempArr);
          tempArr.length = 0;
          //SenecaHelper.AddProxyVerifyTask(newList);
        }else{
          tempArr.push(element);
        }
      }

      for(let i=0;i<proxyList.length;i++){
      //proxyList.forEach(item => {
        //console.log(item);
        let item=proxyList[i];
        let result =this.HttpRequest(item.split(':')[0],item.split(':')[1]);//TestPI(item.split(':')[0],item.split(':')[1]);
      }
      //return newList
    } catch (error) {
      console.warn('get proxy list error ...'+error+" "+new Date)
      return error
    }
  }
  // AxiosVerify(ip, port): Promise<boolean>
  // {

  // }
  async HttpRequest(ip, port): Promise<boolean>
{
  try {
    //let por= await portIsOccupied(port);
    let p = new Promise<boolean>((resolve)=>{
        try {
          request({
            url: "https://www.baidu.com/",
            method: "get",
            proxy:"http://"+ip + ":" + port,
            timeout:1000
          }, async (err, response, data)=>{
            if(err == undefined)
            {
              //console.log("======"+ip + ":" + port+"======"+true);
              let proxy=new Proxy();
              proxy.ip=ip;
              proxy.port=port;
              proxy.isActive=true;
              proxy.time=new Date();
              if(undefined!=this.action){
                this.action(proxy);
              }
              resolve(true);
            }
            else
            {
              //console.log("======"+ip + ":" + port+"======"+false);
              resolve(false);
            }
          })
        } catch (error) {}})
    return p;
  } catch (error) {
    console.log(error+" "+new Date)
  }
  
}
  async init(ipCount = 100,action:any=undefined,urlType:URLType=URLType["66ip"]) {
    // 因为获取代理ip是异步的，因此配合promise化的request， 可以直接使用 await来处理异步
    // 不用像早起写成功回调
    //this.ctx.body = await this.get66ipData()
    const newlist =  await this.get66ipData(ipCount,urlType);
    
  }
  constructor (ipCount = 100,action:any=undefined,urlType:URLType=URLType["66ip"]){
    this.action=action;
    this.init(ipCount,action,urlType)
  }
}

//exports.default = HomeController
//let test= new HomeController(9999,undefined,URLType["66ip"])