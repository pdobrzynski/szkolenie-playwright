import { expect, test } from '@playwright/test';

test('assertions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2')
  await page.getByRole('button', {name: 'Start'}).click()
  await expect(page.locator('#finish')).toHaveText('Hello World!', {timeout: 10000})

});

