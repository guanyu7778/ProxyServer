import { Router } from "express";
import * as express from "express";

export default class IndexRouter
{
    router: Router = express.Router();
    constructor(){
        this.router.get("/", (req, res, next) => {
            if(req.session.userid != null)
            {
                res.render('index', {userName: "管理员"});
            }
            else
            {
                res.redirect("/login")
            }
        });
        this.router.post('/', function(req, res, next) {
            req.session.userid = null
            let dic = {}
            dic["result"] = "ok"
            dic["msg"] = "退出成功"
            //let str = JSON.stringify(dic)
            res.send(dic)
        });
    }
}