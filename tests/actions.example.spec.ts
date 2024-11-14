import { expect, test } from "fixtures/TestFixture";

test.use({
    token: '1234'
})
test('actions', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1')
    await page.getByRole('button', {name: 'Start'}).click()
    await page.click('#finish', {modifiers: ['Control']})
    await expect(page.locator('#finish')).not.toBeVisible()

})