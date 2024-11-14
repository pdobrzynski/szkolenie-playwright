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

let apiContext: APIRequestContext;
let token: string;

test.beforeAll(async ({}) => {
  const tempContext = await request.newContext()
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

  await apiContext.storageState({
    path: 'storageState.json'
  })
})

test.afterAll('', async ({}) => {
  await apiContext.dispose()
})

test('Login API', async ({page}) => {
  const response = await apiContext.post('https://thinking-tester-contact-list.herokuapp.com/contacts', {
    data: contact,
  })
  const responseBody = await response.json()
  console.log(responseBody)
})

test('Mocking', async ({ page }) => {
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
    })
  })
  await page.goto('https://reqres.in/api/users?page=2')
})

test.use({storageState: 'storageState.json'})
test('Keep logged', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/secure')
  // await page.locator('#username').fill('tomsmith')
  // await page.locator('#password').fill('SuperSecretPassword!')
  // await page.getByRole('button', {name: ' Login'}).click()
  await expect(page.locator('.subheader')).toHaveText('Welcome to the Secure Area. When you are done click logout below.')
  // await page.context().storageState({path: 'storageState.json'})
  
  await page.setExtraHTTPHeaders({
    'Authorization': token
  })
})