import test, { expect, Locator } from "@playwright/test";

test('wait for response', async ({page}) => {
    const responsePromise = page.waitForResponse(response => response.url() === 'https://the-internet.herokuapp.com/slow_external'
        && response.status() === 503 && response.request().method() === 'GET')
    await page.goto('https://the-internet.herokuapp.com/slow')
    await responsePromise;

    const clickAndWait = async (locator: Locator, url: string, statusCode: number) => {
        const response = await Promise.all([
            page.waitForResponse(resp => resp.url().includes(url)
            && resp.status() === statusCode),
            locator.click() 
        ])
    }

    await clickAndWait(page.locator('#start'), '/slow_external', 503)
})

test('wait for load state', async ({page}) => {
    await page.waitForLoadState('networkidle')
})

test('wait for url', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/redirector')
    await page.locator('#redirect').click()
    await page.waitForURL('https://the-internet.herokuapp.com/status_codes')
    console.log('Redirected.')
})

test('wait for event', async ({page}) => {
    const dialogPromise = await page.waitForEvent('dialog')
    dialogPromise.accept()
})

test('listener', async ({page}) => {
    page.on('dialog', async dialog => {
        console.log(dialog.accept())
    })

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    await page.getByRole('button', {name: 'Click for JS Confirm'}).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok')
})

test('listener - console', async ({page}) => {
    page.on('console', async msg => {
        if (msg.type() === 'error') {
            console.log('Błąd konsoli: ', msg.text())
        }
    })
    await page.goto('https://the-internet.herokuapp.com/javascript_error')
})