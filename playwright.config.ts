import { defineConfig, devices } from '@playwright/test';
import { TestUser } from 'fixtures/Fixture2';
import MyReporter from 'reporter/my-reporter';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// if (process.env.ENVIRONMENT) {
//   console.log("ENVIRONMENT: ", process.env.ENVIRONMENT);
//   config({
//     path: `.env.${process.env.ENVIRONMENT}`,
//     override: true,
//   });
// } else {
//   config();
// }
/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig<TestUser>({
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['./reporter/my-reporter.ts', {customOptions: 'Parmetrized Tests'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://google.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    testIdAttribute: 'data-cy',
    //storageState: 'storageState.json'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'regresja',
      testMatch: /screen/,
      use: {
        firstName: 'Joe',
        lastName: 'Biden'
      }
      
      //dependencies: ['login'],
      // use: {
      //   storageState: 'storageState.json'
      // }
    },
    // {
    //   name: 'e2e',
    //   testDir: './tests/smoke',
    //   timeout: 90000,
    // },
    // {
    //   name: 'setupDb',
    //   testMatch: /.*setupDb.spec.ts/
    // }

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});
