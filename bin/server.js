"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
// Holy imports 
const firestore_1 = require("firebase/firestore");
const app_1 = require("firebase/app");
const expressServer_1 = require("./expressServer");
const express_1 = __importDefault(require("express"));
const expressApp = (0, express_1.default)();
const dotenv = __importStar(require("dotenv"));
const port = 8080;
// Allow us to access environment variables
dotenv.config();
// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBcLTrzKLlUwI_TzRbjiXpRxlbZexjabCQ",
    authDomain: "it-666-367215.firebaseapp.com",
    projectId: "it-666-367215",
    storageBucket: "it-666-367215.appspot.com",
    messagingSenderId: "78530923352",
    appId: "1:78530923352:web:a493b0364949dfeb39332d",
    measurementId: "G-FKKWBPY5F5"
};
// Firebase intialization 
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
class server {
    constructor() {
        if (!process.env.PORT) {
            console.error("Environment variable PORT is not defined. Please create a .env and add it.");
            process.exit(1);
        }
        const PORT = parseInt(process.env.PORT, 10);
        // Init the server and run the things
        let expressServer = new expressServer_1.expressServerRunner(PORT);
        expressServer.startServer();
    }
}
exports.server = server;
// Let's ride
let mServer = new server();
