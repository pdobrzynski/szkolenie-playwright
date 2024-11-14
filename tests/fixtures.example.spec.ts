import { expect } from "@playwright/test"
import { test } from "fixtures/TestFixture"
import { Elements } from "pages/Elements"

let userId: number
const email = 'example.playwright@test.com'
const password = 'playwright'

test('example test 1', async ({}) => {
    
})

test('example test 2', async ({}) => {
    
})

test('example test 3', async ({elementsPage}) => {
})

// test('fixtures', async ({elementsPage}) => {
//     await elementsPage.goto()
//     await elementsPage.fillEmail(email)
//     await elementsPage.fillPassword(password)
//     await elementsPage.clickSubmitButton();
//     await elementsPage.hasVisibleAddContactButton()
//     await elementsPage.hasExistingRow('John Doe')
// })