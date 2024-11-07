import { After, Before, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import ElementUtil from '../utils/elements-utils';
import { pageObjectManager } from '../utils/pageObjectManager';
import * as dotenv from 'dotenv'; 
dotenv.config();
setDefaultTimeout(60 * 10000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  console.clear();
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  console.log("Browser launched.");
});

Before(async function (scenario: ITestCaseHookParameter) {
  console.log("Initializing page objects...");
  if (!page) {
    throw new Error("Page is not initialized.");
  }
  this.POManager = new pageObjectManager(page);
  this.loginPage = this.POManager.getLoginPage();
  console.log("Page objects initialized.");
});

BeforeStep(function() {
  // Add any setup steps needed before each step
  console.log("Before step...");
});

AfterStep(async function({ result, pickle }) {
  console.log("After step...");
  if (result.status === Status.FAILED) {
    await page.screenshot({ path: "failed-screenshots/" + pickle.steps + '-ss.png' });
  } else if (result.status === Status.PASSED) {
    await page.screenshot({ path: "passed-screenshots/" + (new Date()).getMilliseconds() + '-ss.png' });
  }
});

After(async function({ result, pickle }) {
  console.log("After scenario...");
  if (result?.status === Status.FAILED) {
    const img = await page.screenshot({ path: `./test-results-cucumber/screenshots/${pickle.name}.png`, type: "png" });
    this.attach(img, "image/png");
  }
  if (context && context.pages().length > 0) {
    await context.clearCookies();
  }
});

AfterAll(async function() {
  console.log("Closing page...");
  if (page && !page.isClosed()) {
    await page.close();
  }
  console.log("Closing context...");
  if (context) {
    await context.close();
  }
  console.log("Closing browser...");
  if (browser) {
    await browser.close();
  }
  console.log("Browser closed.");
});

export {
  page,
  browser,
  context
};
