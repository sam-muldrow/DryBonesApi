// = testInterface.ts
// == Defines data structures to be used for DB

export interface Test {
    testName: string;
    testTarget: string
    testCreated: Date;
    description: string;
    testData: TestData;
    testLog: TestLog;
}
  
export interface TestId extends Test {
    id: number;
}

export interface Tests {
  [key: number]: TestId
}

export interface Sessions {
  [index: number]: Session
}

export interface Session {
  sessionName: string;
  sessionCreated: Date;
  description: string;
  testData: TestData;
  testLogs: TestLog;
}

export interface TestData {
 data: TestDataEntry[]
}

export interface TestDataEntry {
  id: string,
  key: string,
  data: string,
  timeStamp: Date,
}

export interface TestLog {
  Logs: TestLogEntry[]
}

export interface TestLogEntry {
  id: number;
  key: string;
  dateCreated: Date;
  value: string;
}