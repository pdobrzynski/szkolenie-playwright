import { test, expect } from "fixtures/TestFixture";

test.only('visual comparisons', async ({ page, elementsPage }) => {
    await elementsPage.goto()
    await elementsPage.fillEmail('example.playwright@test.com')
    await elementsPage.fillPassword('playwright')
    await elementsPage.clickSubmitButton()
    await elementsPage.hasVisibleAddContactButton()

    await expect(page).toHaveScreenshot();
})

const contacts = [
    { contactFirstName: 'Jessica', contactLastName: 'Alba' },
    { contactFirstName: 'Anthony', contactLastName: 'Kowalsky' },
    { contactFirstName: 'Jack', contactLastName: 'Black' },
]

contacts.forEach(({ contactFirstName, contactLastName }) => {
    test.describe(contactFirstName + ' ' + contactLastName, () => {
        test.use({firstName: contactFirstName, lastName: contactLastName})
        // test.afterEach('cleanup', async ({elementsPage}) => {
        //     await elementsPage.clickOnContactDetails(contactFirstName + ' ' + contactLastName)
        //     await elementsPage.clickDeleteContact()
        // })

        test(`Parmetrized tests with name: ${contactFirstName + ' ' + contactLastName}`, async ({elementsPage}) => {
            await elementsPage.goto()
            await elementsPage.fillEmail('example.playwright@test.com')
            await elementsPage.fillPassword('playwright')
            await elementsPage.clickSubmitButton()
            await elementsPage.hasVisibleAddContactButton()
            await elementsPage.addContact(contactFirstName, contactLastName)
            await elementsPage.hasExistingRow(contactFirstName + ' ' + contactLastName)
        })
    })
})

