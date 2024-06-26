import express, { Request, Response } from "express";
import * as TestService from "./testService";
import { Test, TestId, TestData, TestLog, TestLogEntry, Tests} from "./testInterface"
import { authHandler } from "../middleware/authMiddleware";
import * as dotenv from "dotenv";
// Allow us to access environment variables
dotenv.config(); 

export const testRouter = express.Router();

/*
BEGIN UNAUTHORIZED ENDPOINTS
*/

testRouter.get("/x", async (req: Request, res: Response) => {
  res.status(200).send("Success");
})

/*
END UNAUTHORIZED ENDPOINTS
*/

testRouter.use(authHandler)

testRouter.get("/all", async (req: Request, res: Response) => {
  try{
    const tests: Tests = await TestService.getAllTests();
    console.log(tests);
    if (tests) {
      return res.status(200).json(tests);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500).send("ISE");
  }
});

testRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const test: Test = await TestService.getTestFromId(id);  
      console.log("TEST: ", test)
      if (test) {
        return res.status(200).json(test);
      }
      res.sendStatus(404).send("id not found");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
});

  testRouter.get("/:id/data", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const testData: TestData = await TestService.getTestDataFromTestId(id);  
      console.log("TEST DATA: ", testData)
      if (testData) {
        return res.status(200).json(testData);
      }
      res.sendStatus(404).send("id not found");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
  });

  testRouter.get("/:id/data/:key", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const testDataKey = req.params.key;
  
    try {
      const testData: TestData = await TestService.getTestDataFromTestDatakey(id, testDataKey);  
      console.log("TEST DATA: ", testData);
      if (testData) {
        return res.status(200).json(testData);
      }
      res.sendStatus(404).send("id not found");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
  });

  testRouter.get("/:id/data/latest/:key", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const testDataKey = req.params.key;
  
    try {
      const testDataEntry: TestDataEntry = await TestService.getLatestTestDataFromTestDatakey(id, testDataKey);  
      console.log("TEST DATA ENTRY: ", testDataEntry);
      if (testDataEntry) {
        return res.status(200).json(testDataEntry);
      }
      res.sendStatus(404).send("id not found");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
  });



  testRouter.get("/:id/log", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const testLog: TestLog = await TestService.getTestLogFromTestId(id);  
      console.log("TEST Log: ", testLog)
      if (testLog) {
        return res.status(200).json(testLog);
      }
      res.sendStatus(404).send("log not found");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
  });

  testRouter.get("/:id/log/:key", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const TestLogKey: string = req.params.key;
  
    try {
      const testLog: TestLog = await TestService.getTestLogFromKey(id, TestLogKey);  
      console.log("TEST Log: ", testLog)
      if (testLog) {
        return res.status(200).json(testLog);
      }
      res.sendStatus(404).send("log not found");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
  });

  testRouter.post("/:id/data", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const bodyObject = req.body;
      console.log("received request with body:", bodyObject)
      if (bodyObject) {
        const testDataId: Number = await TestService.AddOrEditTestData(id, bodyObject.key, bodyObject.value, bodyObject.relatedTo);  
        return res.status(200).json(testDataId);
      }
      res.sendStatus(404).send("No body no worky");
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500).send("ISE");
    }
  });

testRouter.post("/:id/log", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const bodyObject = req.body;
    console.log("received request with body:", bodyObject)
    if (bodyObject) {
      const testDataId: Number = await TestService.AddOrEditLogEntryToTestId(id, bodyObject.key, bodyObject.value);  
      return res.status(200).json(testDataId);
    }
    res.sendStatus(404).send("No body no worky");
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500).send("ISE");
  }
});


testRouter.post("/", async (req: Request, res: Response) => {
  try {

    let test: Test = req.body;  
    const ret: number = await TestService.createNewTestId(test);
    console.log(ret);
    if(ret) {
      res.json({'testId': ret});
    }
    
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500).send(e.message);
  }
})