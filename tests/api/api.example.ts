import test, { APIRequestContext, expect, request } from "@playwright/test";

const body = {
    "email": "example.playwright@test.com",
    "password": "playwright"
}

const contact = {
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "1970-01-01",
    "email": "jdoe@fake.com",
    "phone": "8005555555",
    "street1": "1 Main St.",
    "street2": "Apartment A",
    "city": "Anytown",
    "stateProvince": "KS",
    "postalCode": "12345",
    "country": "USA"
}

let apiContext: APIRequestContext
let token: string;

test.beforeAll(async ({}) => {
    const tempContext = await request.newContext();
  const response = await tempContext.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
    data: body
}) 
  const responseBody = await response.json()
  token = 'Bearer ' + responseBody.token
  await tempContext.dispose();

  apiContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: token
    }
  })
    const response = await apiContext.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
        data: body
    }) 

    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody).toHaveProperty('token')

    token = 'Bearer ' + responseBody.token

    await apiContext.storageState({
        path: 'storageState.json'
    })
})

test.afterAll(async () => {
    await apiContext.dispose();
  });

test('login API', async ({}) => {


    await apiContext.post('https://thinking-tester-contact-list.herokuapp.com/contacts', {
        data: contact,
        headers: {
            Authorization: token
        }
    }) 

    const getContactList = await apiContext.get('https://thinking-tester-contact-list.herokuapp.com/contacts', {
        headers: {
            Authorization: token
        }
    })

    console.log(await getContactList.json())
    
})
//test.use({storageState: 'storageState.json'})
test('logged in', async ({page}) => {
    // await page.goto('https://the-internet.herokuapp.com/secure')
    // await expect(page.locator('.subheader')).toHaveText('Welcome to the Secure Area. When you are done click logout below.')
    // await page.waitForTimeout(5000)

    // await page.goto('https://the-internet.herokuapp.com/login')
    // await page.locator('#username').fill('tomsmith')
    // await page.locator('#password').fill('SuperSecretPassword!')
    // await page.getByRole('button', {name: ' Login'}).click()
    // await page.context().storageState({ path: 'storageState.json' });
    //   page.setExtraHTTPHeaders({
    'Authorization': 'token'
  })
})

test.only('Mocking a user list response', async ({ page }) => {
    // route.abort - abort request (optional errorCode)
    // route.continue - nadpisane requestu, np zmiana headera
    // route.fallback jak continue, ale działa przed innymi routami
    // route.fetch - wpierw zaciąga response, a potem można go zmienić i fulfill
    // route.fulfill zmiana responsa
    
    await page.route('https://reqres.in/api/users?page=2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            { id: 1, email: 'mockuser1@example.com' },
            { id: 2, email: 'mockuser2@example.com' }
          ]
        })
      });
    });
  
    await page.goto('https://reqres.in/api/users?page=2');
});
