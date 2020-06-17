import APP from "../app";
import http = require("http");

const port = 3000;
const app = new APP(port, 0);
const server = http.createServer(app.app);

server.listen(port); 
