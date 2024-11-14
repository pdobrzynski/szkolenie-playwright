import { test } from '@playwright/test';

test('locators', async ({ page }) => {
    // <input aria-label="Username">
    // <label for="password-input">Password:</label>
    page.getByLabel('Username')
    page.getByLabel('Password')
 
    // <input type="email" placeholder="name@example.com" />
    page.getByPlaceholder('name@example.com')
    // <h3>Sign up</h3>
    // <label>
    // <input type="checkbox" /> Subscribe
    // </label>
    // <br/>
    // <button>Submit</button>
    page.getByRole('heading', {name: 'Sign up'})
    page.getByRole('checkbox', {name: 'Subscribe'})
    page.getByRole('button', {name: /submit/i})
    // <button data-cy="directions">Itinéraire</button>
    page.getByTestId('directions')
    // <div>Hello</div>
    page.getByText('Hello')
    // <span title='Issues count'>25 issues</span>
    page.getByTitle('Issues count')

    //<button title="Subscribe">Subscribe Now</button>
    const button = page.getByRole('button').and(page.getByTitle('Subscribe'))
    const buttonLocator = page.getByRole('button')
    buttonLocator.filter({hasText: 'Subscribe Now'})

    page.locator('//div')

    
});




