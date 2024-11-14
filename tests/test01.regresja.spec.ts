import test, { devices, expect } from "@playwright/test";

const users = [
    {username: 'user1', password: 'password1'},
    {username: 'user2', password: 'password2'},
    {username: 'user3', password: 'password3'},
]
test('mobile example', async ({page}) => {
    const workerIndex = test.info().workerIndex
    const currentUser = users[workerIndex]

    console.log('Logowanie użytkownikiem ' + currentUser.username + ' ' + currentUser.password)
    // await page.goto('/')
    // console.log(page.url());
})

test('mobile example 2', async ({page}) => {
    const workerIndex = test.info().workerIndex
    const currentUser = users[workerIndex]

    console.log('Logowanie użytkownikiem ' + currentUser.username + ' ' + currentUser.password)
    // await page.goto('/')
    // console.log(page.url());
})