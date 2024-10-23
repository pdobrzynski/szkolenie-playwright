import test, { expect } from "@playwright/test";

test('actions', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1')
    await page.getByRole('button', {name: 'Start'}).click()
    await expect(page.locator('#finish')).toBeVisible()
})


type AriaAttributesSupported = 'selected'|'hidden'|'disabled'

    async expectToHaveAriaAttributeValue (locator: Locator, label: AriaAttributesSupported, value: string) {
        return await expect(locator).toHaveAttribute(`aria-${label}`, value);
      }
