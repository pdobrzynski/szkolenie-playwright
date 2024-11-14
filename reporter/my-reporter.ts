import {Reporter, FullConfig, Suite, TestCase, TestResult, FullResult} from '@playwright/test/reporter'
import fs from 'fs';

interface TestReport {
    title: string;
    status: string;
    duration: number;
    errors: string[];
  }

class MyReporter implements Reporter {
     private results: TestReport[] = [];
    constructor(options: { customOptions?: string } = {}) {
        console.log(`my-reporter setup with customOption set to ${options.customOptions}`);
    }

    onBegin(config: FullConfig, suite: Suite): void {
       console.log(config.workers)
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        console.log(`Rozpoczynam test: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const testResult: TestReport = {
            title: test.title,
            status: result.status,
            duration: result.duration,
            errors: result.errors.map((error: TestError) => error.message),
          };
      
          this.results.push(testResult);
      
          console.log(`Test zakończony: ${test.title} - ${result.status}`);
    }

    onEnd(result: FullResult): Promise<{ status?: FullResult['status']; } | undefined | void> | void {
        const filePath = `./test-results/custom-report.json`;
        fs.writeFileSync(filePath, JSON.stringify(this.results, null, 2), 'utf-8');
        console.log(`Zapisano wyniki testów do ${filePath}`);
    }
}
export default MyReporter;