import { Router } from "express";
import * as express from "express";

export default class LoginRouter
{
    router: Router = express.Router();
    constructor(){
        this.router.get("/", (req, res, next) => {
            if(req.session.userid != null)
            {
                res.redirect("/");
            }
            else {
                res.render('login', {});
            }
        });
        this.router.post('/', function(req, res, next) {
            if(req.body.name == "root" && req.body.password == "admin123") { 
                req.session.userid = "hello";
                let dic = {};
                dic["result"] = "ok";
                dic["msg"] = "登陆成功";
                res.send(dic);
            }
            else
            {
                let dic = {}
                dic["result"] = "error";
                dic["msg"] = "账号或密码错误";
                res.send(dic);
            }
        });
    }
}