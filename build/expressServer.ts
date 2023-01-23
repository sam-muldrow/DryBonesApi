// Express Server Class
// Holy imports 
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { expressServerRunner } from "./expressServer"
import express from "express";
import path from "path";
const expressApp = express();
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { testRouter } from "./tests/testRouter";
import { notFoundHandler } from "./middleware/notFoundMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";


// class to represent a whole express server
export class expressServerRunner {
    port: number

    constructor(port: number) {
        this.port = port;
    }

    public defineExploitApi() {

    }

    public startServer() {
        expressApp.use(cors());
        expressApp.use(helmet());
        expressApp.use(express.json());
        expressApp.use("/api/test", testRouter)
        expressApp.use(notFoundHandler)
        expressApp.use(errorHandler)
        expressApp.listen( this.port, () => {
            // tslint:disable-next-line:no-console
            console.log( `Server started on port: ${ this.port }` );
        } );
    }
}




