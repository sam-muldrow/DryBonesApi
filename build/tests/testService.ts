// = testService.ts
// == Resolves endpoint requests, and packages the data using testInterface interfaces.

import { Test, TestId, TestData, TestDataEntry,TestLog, TestLogEntry, Tests, Sessions} from "./testInterface"
import { firebaseDatabaseConnector } from "../database/databaseConnector";
import test from "node:test";

// Define firebase connector
const firbaseConnector = new firebaseDatabaseConnector();


// Define all data services here
export const returnThisNumber = async (id: number): Promise<number> => {return id};


export async function getTestFromId(testId: number): Promise<Test> {
    return new Promise<Test>(async (resolve) => {
        resolve(await firbaseConnector.getTestFromId(testId));
    });
}

export async function getTestDataFromTestDatakey(testId: number, TestDataKey: string): Promise<TestData> {
    return new Promise<TestData>(async (resolve) => {
        resolve(await firbaseConnector.getTestDataFromTestDatakey(testId, TestDataKey));
    });
}

export async function getLatestTestDataFromTestDatakey(testId: number, TestDataKey: string): Promise<TestDataEntry> {
    return new Promise<TestDataEntry>(async (resolve) => {
        resolve(await firbaseConnector.getLatestTestDataFromTestDatakey(testId, TestDataKey));
    })
}

export async function getTestDataFromTestId(testId: number): Promise<TestData> {
    return new Promise<TestData>(async (resolve) => {
        resolve(await firbaseConnector.getTestDataFromTestId(testId));
    });
}

export async function getTestLogFromTestId(testId: number): Promise<TestLog> {
    return new Promise<TestLog>(async (resolve) => {
        resolve(await firbaseConnector.getTestLogFromTestId(testId));
    });
}

export async function getTestLogFromKey(testId: number, TestLogKey: string): Promise<TestLog> {
    return new Promise<TestLog>(async (resolve) => {
        resolve(await firbaseConnector.getTestLogFromKey(testId, TestLogKey));
    });
}

// Creates a new test and returns the ID
export async function createNewTestId(): Promise<number> {
    console.log("I'm in here") 
    const testTestData: TestData = {
        'test_test': 'somedata'
    }
    let testTestLog: TestLog = {
        Logs: []
    }
    testTestLog.Logs.push({
        eTest: "meta",
        dateCreated: new Date(),
        information: "ur mum"
    })
    const testTest: Test = {
        testName: "test",
        testTarget: "ur mom",
        testCreated: new Date,
        description: "a test test",
        testData: testTestData,
        testLog: testTestLog
    }
    return new Promise<number>(async (resolve) => {
        resolve(await firbaseConnector.createNewTestId(testTest));
    });
}

export async function AddOrEditTestData(testId: number, key: string, value: string): Promise<Number> {
    return new Promise<Number>(async (resolve) => {
        resolve(await firbaseConnector.AddOrEditTestData(testId, key, value));
    });
}


export async function AddOrEditLogEntryToTestId(testId: number, key: string, value: string): Promise<Number> {
    return new Promise<Number>(async (resolve) => {
        resolve(await firbaseConnector.AddOrEditLogEntryToTestId(testId, key, value));
    });
}

function AddLogEntryToSessionId(testId: number, sessionId: number) {
    
}