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
    firstName: ['John', { option: true }],
    lastName: ['Doe', { option: true }],
    elementsPage: async ({page, firstName, lastName}, use) => {
        const elementsPage = new Elements(page)
        await elementsPage.goto()
        await elementsPage.fillEmail('example.playwright@test.com')
        await elementsPage.fillPassword('playwright')
        await elementsPage.clickSubmitButton()
        await elementsPage.addContact(firstName, lastName)
        await use(elementsPage)

        await elementsPage.clickOnContactDetails(firstName + ' ' + lastName)
        await elementsPage.clickDeleteContact()
    },
    token: ['token bearer', {option: true}],
    // page: async({token, page}) => {
    //     await page.setExtraHTTPHeaders({
    //         'Authorization': token
    //       })
    // }
})