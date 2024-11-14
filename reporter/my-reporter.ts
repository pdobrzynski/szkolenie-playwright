import {Reporter, FullConfig, Suite, TestCase, TestResult, FullResult} from '@playwright/test/reporter'
import fs from 'fs';

interface TestReport {
    title: string;
    status: string;
    duration: number;
    errors: string[];
  }

type ReporterOptions = {
    reportFileName?: string;
}

class MyReporter implements Reporter {
    private results: TestReport[] = [];
    private reportFileName: string;
    constructor(options: ReporterOptions = {}) {
        console.log(`my-reporter setup with file set to ${options.reportFileName}.json`);
        this.reportFileName = options.reportFileName;
    }

    onBegin(config: FullConfig, suite: Suite): void {
    //    config.workers = 3
    //    console.log(config.workers)
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
          console.log('-------------------------------------------------')
    }

    onEnd(result: FullResult): Promise<{ status?: FullResult['status']; } | undefined | void> | void {
        const filePath = `./test-results/${this.reportFileName}.json`;
        fs.writeFileSync(filePath, JSON.stringify(this.results, null, 2), 'utf-8');
        console.log(`Zapisano wyniki testów do ${filePath}`);
    }
}
export default MyReporter;
