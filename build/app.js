"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const path = require("path");
const OrmHelper_1 = require("./Tools/OrmHelper");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const login_1 = require("./router/login");
const index_1 = require("./router/index");
const session = require("express-session");
class APP {
    constructor(port, type) {
        OrmHelper_1.default.CreateConnectionByConfig("default").then((con) => {
            OrmHelper_1.default.connection = con;
            console.log("db init");
        }).catch((err) => {
            console.log("db error");
        });
        this.app = express();
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
        this.app.use('/', new index_1.default().router);
        this.app.use('/login', new login_1.default().router);
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            next(createError(404));
        });
        // error handler
        this.app.use(function (err, req, res, next) {
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
exports.default = APP;
//# sourceMappingURL=app.js.map