import { expect, Locator, Page } from "@playwright/test";

export class Elements {
    readonly page: Page
    protected emailInput: Locator;
    protected passwordInput: Locator;
    protected submitButton: Locator;
    protected addContactButton: Locator;
    protected firstNameInput: Locator;
    protected lastNameInput: Locator;
    protected deleteContactButton: Locator;
    
    constructor(page: Page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('Email')
        this.passwordInput = page.getByPlaceholder('Password')
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.addContactButton = page.locator('#add-contact')
        this.firstNameInput = page.getByPlaceholder('First Name')
        this.lastNameInput = page.getByPlaceholder('Last Name')
        this.deleteContactButton = page.getByRole('button', { name: 'Delete Contact' })
    }

    async goto() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/')
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email)
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async hasVisibleAddContactButton() {
        await expect(this.addContactButton).toBeVisible()
    }

    async addContact(firstName: string, lastName: string) {
        await this.addContactButton.click()
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.submitButton.click()
        await this.page.waitForURL('**\/contactList')
    }

    async hasExistingRow(name: string) {
        await expect(this.page.getByText(name)).toBeVisible()
    }

    async clickOnContactDetails(name: string) {
        await this.page.getByText(name).click()
        await this.page.waitForURL('**\/contactDetails')
    }

    async clickDeleteContact() {
        this.page.on('dialog', dialog => dialog.accept());
        await this.deleteContactButton.click()
        await this.page.waitForURL('**\/contactList')
    }
}