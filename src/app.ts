import "reflect-metadata";
import * as express from "express";
import path = require("path");
import ORMHelper from "./Tools/OrmHelper";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import createError = require("http-errors");
import LoginRouter from "./router/login";
import IndexRouter from "./router/index";
import session = require("express-session");

export default class APP {
    app: any;
    constructor(port: number, type: number){
        ORMHelper.CreateConnectionByConfig("default").then(
            (con)=>{
                ORMHelper.connection = con;
                console.log("db init");
            }
        ).catch(
            (err)=>
            {
                console.log("db error") 
            }
        );
        this.app = express();
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(session({
            name: "identify",
            secret: 'changesession',
            //store: new FileStore(),
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 60 * 60 * 1000 // 有效期，单位是毫秒
            }
        }));
        // view engine setup
        this.app.set('views', path.join(path.resolve(__dirname, '..'), 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(path.resolve(__dirname, '..'), 'public')));

        this.app.use('/', new IndexRouter().router);
        this.app.use('/login', new LoginRouter().router);
        // catch 404 and forward to error handler
        this.app.use(function(req, res, next) {
            next(createError(404));
        });

        // error handler
        this.app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        this.app.set('port', port);
    }
}