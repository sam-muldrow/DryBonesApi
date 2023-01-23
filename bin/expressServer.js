"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressServerRunner = void 0;
const express_1 = __importDefault(require("express"));
const expressApp = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const port = 8080;
// class to represent a whole express server
class expressServerRunner {
    constructor(port) {
        this.port = port;
    }
    defineTestApi() {
        expressApp.get("/test/", (req, res) => {
        });
    }
    defineExploitApi() {
    }
    startServer() {
        expressApp.use((0, cors_1.default)());
        expressApp.use((0, helmet_1.default)());
        expressApp.use(express_1.default.json());
        expressApp.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server started on port: ${this.port}`);
        });
    }
}
exports.expressServerRunner = expressServerRunner;
