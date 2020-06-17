"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class ORMHelper {
    static CreateConnection() {
        return typeorm_1.createConnection();
    }
    static CreateConnectionByConfig(config) {
        return typeorm_1.createConnection(config);
    }
}
exports.default = ORMHelper;
//# sourceMappingURL=OrmHelper.js.map