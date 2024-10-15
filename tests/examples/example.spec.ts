import { expect, test } from '@playwright/test';

const users = [
  {
    username: 'user1',
    password: 'password1'
  },
  {
    username: 'user2',
    password: 'password2'
  },
  {
    username: 'user3',
    password: 'password3'
  }]

test.use({
  baseURL: 'https://google.com',
  headless: true
})

test('example', async ({ page }) => {
  //console.log(test.info().project.name)
  //console.log('Worker index: ' + test.info().workerIndex)
  const workerIndex = test.info().workerIndex
  
  const currentUser = users[workerIndex]
  console.log('Logowanie użytkownikiem: ' + currentUser.username + ' ' + currentUser.password)
  //await page.goto('/');
  expect(1).toEqual(1)
});

test('example 2', async ({ page }) => {
  //console.log(test.info().project.name)
  //console.log('Worker index: ' + test.info().workerIndex)

  const workerIndex = test.info().workerIndex
  const currentUser = users[workerIndex]
  console.log('Logowanie użytkownikiem: ' + currentUser.username + ' ' + currentUser.password)
  await page.goto('/');
});
