import {test as base, Locator} from '@playwright/test'
import { expect as baseExpect } from '@playwright/test';
import { Elements } from 'pages/Elements'
import fs from 'fs'

type MyPages = {
    elementsPage: Elements
}

export type TestUser = {
    firstName: string
    lastName: string
}

export type UserInfo = {
    token: string;
}
export const test = base.extend<MyPages & TestUser & UserInfo &
 {saveLogs: void, testScope: void},
  { workerScope: void }> ({
    saveLogs: [async ({}, use, testInfo) => {
        const logs: string[] = [];

        const testStartTime = new Date().toISOString();
        logs.push(`--- Test Name: ${testInfo.title} ---`);
        logs.push(`--- Test Start Time: ${testStartTime} ---`);
    
        await use();

        const testEndTime = new Date().toISOString();
        const testStatus = testInfo.status;
        logs.push(`--- Test End Time: ${testEndTime} ---`);
        logs.push(`--- Test Status: ${testStatus} ---`);
        logs.push(`--- Expected Status: ${testInfo.expectedStatus} ---`);
    
        if (testInfo.status !== testInfo.expectedStatus) {
            const logFile = testInfo.outputPath('logs.txt');
            await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
            testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
        }
    }, { auto: true }],
    workerScope: [async ({}, use) => {
        //console.log('Worker Scope')
        await use()
        //console.log('Usuwanie workera')
    }, {scope: 'worker', auto: true}],

    testScope: [async ({}, use) => {
        //console.log('Test Scope')
        await use()
    }, {scope: 'test', auto: true}]

})