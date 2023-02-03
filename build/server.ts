// Holy imports 

import { expressServerRunner } from "./expressServer"
import express from "express";
import path from "path";
const expressApp = express();
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
const port = 8080;

// Allow us to access environment variables
dotenv.config(); 

export class server {
  constructor() {
    if (!process.env.PORT) {
      console.error("Environment variable PORT is not defined. Please create a .env and add it.")
      process.exit(1);
   }
   
   const PORT: number = parseInt(process.env.PORT as string, 10);

    // Init the server and run the things
    let expressServer = new expressServerRunner(PORT);
    expressServer.startServer();
  }
}

// Let's ride
let mServer = new server();


