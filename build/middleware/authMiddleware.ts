import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const authHandler = (
  request: Request,
  response: Response,
  next: Function
) => {
  const apiKey = request.get("API-Key");
  console.log("Incoming api key: ", apiKey);
  if (
    !apiKey ||
    (apiKey !== process.env.API_KEY_ADMIN && apiKey !== process.env.API_KEY_DEV)
  ) {
    response.status(401).send("Unauthorized");
    return;
  } else {
    next();
  }
};
