"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const http = require("http");
const port = 3000;
const app = new app_1.default(port, 0);
const server = http.createServer(app.app);
server.listen(port);
//# sourceMappingURL=www.js.map