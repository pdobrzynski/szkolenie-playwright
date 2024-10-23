import { test } from '@playwright/test';

test('example', async ({ page }) => {
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
    page.getByRole('heading', { name: 'Sign up' })
    page.getByRole('checkbox', { name: 'Subscribe' })
    page.getByRole('button', { name: /submit/i })

    // <button data-testid="directions">Itinéraire</button>
    page.getByTestId('directions')

    // <div>Hello</div>
    page.getByText('Hello');

    // <span title='Issues count'>25 issues</span>
    page.getByTitle('Issues count')

    page.locator('')

    //<button title="Subscribe">Subscribe Now</button>
    // and
    const button = page.getByRole('button').and(page.getByTitle('Subscribe'));


    // filter
    const buttonLocator = page.getByRole('button');
    buttonLocator
    .filter({ has: page.getByTitle('Subscribe') })
});




