import test, { expect } from "@playwright/test";

test('wait for resposne', async ({page}) => {
    const responsePromise = page.waitForResponse(response =>
        response.url() === 'https://the-internet.herokuapp.com/slow_external' && response.status() === 503
            && response.request().method() === 'GET'
      );
    await page.goto('https://the-internet.herokuapp.com/slow')
    await responsePromise;
})

test('wait for url', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/redirector')
    await page.locator('#redirect').click()
    await page.waitForURL('https://the-internet.herokuapp.com/status_codes');
    console.log('Redirected.')
})


test('events', async ({page}) => {
    // podobne jak waitForEvents ale mniej intuicyjne
    page.on('dialog', async dialog => {
        console.log(dialog.accept())
    })
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    await page.getByRole('button', {name: 'Click for JS Confirm'}).click()
    await expect(page.locator('#result')).toHaveText('You clicked: Ok')
})

test('page.on console', async ({page}) => {
    page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log('Błąd konsoli:', msg.text());
        }
      });
    await page.goto('https://the-internet.herokuapp.com/javascript_error')
})
