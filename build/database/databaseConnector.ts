import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  getCountFromServer,
} from "firebase-admin/firestore";
import {
  initializeApp,
  App,
  AppOptions,
  getApps,
  getApp,
  cert,
} from "firebase-admin/app";
import * as firebase from "firebase-admin";
import * as dotenv from "dotenv";
import {
  Test,
  TestData,
  TestDataEntry,
  TestLog,
  Tests,
} from "../tests/testInterface";
import serviceAccount from "../../it-666-367215-firebase-adminsdk-tmncn-8ea4f7102e.json";
import { application } from "express";
import { rejects } from "assert";
import { QuerySnapshot } from "@google-cloud/firestore";
import { resolve } from "path";

// Allow us to access environment variables
dotenv.config();

// Firebase Config
const firebaseConfig: AppOptions = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  credential: firebase.credential.cert(serviceAccount),
};

// Firebase intialization
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export class firebaseDatabaseConnector {
  async getDocumentCount(collName: string): number {
    return await db
      .collection(collName)
      .get()
      .then(function (querySnapshot) {
        return querySnapshot.size;
      });
  }

  async getTestFromId(testId: number): Promise<Test> {
    console.log(testId);
    const testIdString: string = "" + testId;
    const docRef = await db.collection("test").doc(testIdString).get();
    if (docRef.exists) {
      return new Promise<Test>((resolve) => {
        resolve(docRef.data());
      });
    }
  }

  async getAllTests(): Promise<Tests> {
    const querySnapshot = await db
      .collection("test")
      .orderBy("id", "desc")
      .get();
    console.log("Getting all tests");
    let tests: Tests = { data: [] };
    querySnapshot.forEach((doc) => {
      tests.data.push(doc.data());
    });
    console.log(tests);
    return new Promise<Tests>((resolve) => {
      resolve(tests);
    });
  }

  async getTestDataFromTestId(testId: number): TestData {
    console.log(testId);
    const testIdString: string = "" + testId;
    const querySnapshot = await db
      .collection("testData")
      .where("id", "==", testId)
      .get();

    if (querySnapshot.size > 0) {
      let testData: TestData = { data: [] };

      querySnapshot.forEach((doc) => {
        testData.data.push(doc.data());
      });
      return new Promise<TestData>((resolve) => {
        resolve(testData);
      });
    }
  }

  async getTestDataFromTestId(testId: number): TestData {
    console.log(testId);
    const testIdString: string = "" + testId;
    const querySnapshot = await db
      .collection("testData")
      .where("id", "==", testId)
      .get();

    if (querySnapshot.size > 0) {
      let testData: TestData = { data: [] };

      querySnapshot.forEach((doc) => {
        testData.data.push(doc.data());
      });
      return new Promise<TestData>((resolve) => {
        resolve(testData);
      });
    }
  }

  async getTestDataFromTestDatakey(
    testId: number,
    testDataKey: string
  ): Promise<TestData> {
    const querySnapshot = await db
      .collection("testData")
      .where("id", "==", testId)
      .where("key", "==", testDataKey)
      .get();
    if (querySnapshot.size > 0) {
      let testData: TestData = { data: [] };
      querySnapshot.forEach((doc) => {
        testData.data.push(doc.data());
      });
      return new Promise<TestData>((resolve) => {
        resolve(testData);
      });
    }
  }

  async getLatestTestDataFromTestDatakey(
    testId: number,
    testDataKey: string
  ): Promise<TestDataEntry> {
    const querySnapshot = await db
      .collection("testData")
      .where("id", "==", testId)
      .where("key", "==", testDataKey)
      .get();
    if (querySnapshot.size > 0) {
      let testData: TestData = { data: [] };
      let maxTimeStamp: number = 0;
      let testEntry: TestDataEntry;
      querySnapshot.forEach((doc) => {
        let currentTimeStep = doc.data().timeStamp;
        if (currentTimeStep > maxTimeStamp) {
          maxTimeStamp = currentTimeStep;
          testEntry = doc.data();
        }
      });
      return new Promise<TestDataEntry>((resolve) => {
        resolve(testEntry);
      });
    }
  }

  async getTestLogFromTestId(testId: number): Promise<TestLog> {
    const testIdString: string = "" + testId;
    const querySnapshot = await db
      .collection("logs")
      .where("id", "==", testId)
      .get();

    if (querySnapshot.size > 0) {
      let testLog: TestLog = { data: [] };

      querySnapshot.forEach((doc) => {
        testLog.data.push(doc.data());
        console.log(doc.data());
      });
      return new Promise<TestLog>((resolve) => {
        resolve(testLog);
      });
    }
  }

  async getTestLogFromKey(testId: number, key: string): Promise<TestLog> {
    const testIdString: string = "" + testId;
    const testLogString: string = key;
    const querySnapshot = await db
      .collection("logs")
      .where("id", "==", testId)
      .where("key", "==", key)
      .get();

    if (querySnapshot.size > 0) {
      let testLog: TestLog = { data: [] };
      querySnapshot.forEach((doc) => {
        testLog.data.push(doc.data());
        console.log(doc.data());
      });
      return new Promise<TestLog>((resolve) => {
        resolve(testLog);
      });
    }
  }

  // Creates a new test and returns the ID
  async createNewTestId(test: Test): Promise<number> {
    try {
      // Set the test id to how many tests we have +1
      const docCount: number = await this.getDocumentCount("test");
      const testId: number = docCount + 1;
      const testIdString: string = "" + testId;
      const docRef = await db.collection("test").doc(testIdString).set({
        id: testId,
        testName: test.testName,
        testTarget: test.testTarget,
        testCreated: test.testCreated,
        description: test.description,
      });
      return new Promise<number>((resolve) => {
        console.log("Created test with ID: ", testId);
        resolve(testId);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      return new Promise<number>((resolve) => {
        resolve(-1);
      });
    }
  }

  async AddOrEditTestData(
    testId: number,
    key: string,
    value: string,
    relatedTo: string
  ): Promise<Number> {
    try {
      const docCount: number = await this.getDocumentCount("testData");
      const testDataId: number = docCount + 1;
      const testDataIdString: string = "" + testDataId;
      console.log(testDataIdString);
      const docRef = await db.collection("testData").doc(key).set(
        {
          id: testId,
          key: key,
          relatedTo: relatedTo,
          data: value,
          timeStamp: Date.now(),
        },
        { merge: true }
      );

      return new Promise<number>((resolve) => {
        console.log("Created test data with ID: ", testId);
        resolve(testDataId);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      return new Promise<number>((resolve) => {
        resolve(-1);
      });
    }
  }

  async AddOrEditLogEntryToTestId(testId: number, key: string, value: string) {
    try {
      const docCount: number = await this.getDocumentCount("logs");
      const testLogId: number = docCount + 1;
      const testLogIdString: string = "" + testLogId;
      const docRef = await db.collection("logs").doc(testLogIdString).set(
        {
          id: testId,
          key: key,
          value: value,
          dateCreated: new Date(),
        },
        { merge: true }
      );
      return new Promise<number>((resolve) => {
        console.log("Created test log with ID: ", testId);
        resolve(testLogIdString);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      return new Promise<number>((resolve) => {
        resolve(-1);
      });
    }
  }
}
