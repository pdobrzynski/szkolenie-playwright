import {test as base, Locator, mergeTests, mergeExpects} from '@playwright/test'
import { expect as baseExpect } from '@playwright/test';
import { test as Fixture2 } from './Fixture2';
import { test as Fixture3 } from './Fixture3';

export const test = mergeTests(Fixture2, Fixture3)

export const expect = baseExpect.extend({
    async toHaveAmount(locator: Locator, expected: number, options?: { timeout?: number }) {
        const assertionName = 'toHaveAmount';
        let pass: boolean;
        let matcherResult: any;
        
        try {
          await baseExpect(locator).toHaveAttribute('data-amount', String(expected), options);
          pass = true;
        } catch (e: any) {
          matcherResult = e.matcherResult;
          pass = false;
        }
    
        const message = pass
          ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
              '\n\n' +
              `Locator: ${locator}\n` +
              `Expected: ${this.isNot ? 'not' : ''}${this.utils.printExpected(expected)}\n` +
              (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
          : () =>  this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
              '\n\n' +
              `Locator: ${locator}\n` +
              `Expected: ${this.utils.printExpected(expected)}\n` +
              (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');
    
        return {
          message,
          pass,
          name: assertionName,
          expected,
          actual: matcherResult?.actual,
        };
      },
    })