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
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

Before(async function (scenario: ITestCaseHookParameter) {
  if (!page) {
    throw new Error("Page is not initialized.");
  }
  this.POManager = new pageObjectManager(page);
  this.loginPage = this.POManager.getLoginPage();
});

BeforeStep(function() {
  // Add any setup steps needed before each step
});

AfterStep(async function({ result, pickle }) {
  if (result.status === Status.FAILED) {
    await page.screenshot({ path: "failed-screenshots/" + pickle.steps + '-ss.png' });
  } else if (result.status === Status.PASSED) {
    await page.screenshot({ path: "passed-screenshots/" + (new Date()).getMilliseconds() + '-ss.png' });
  }
});

After(async function({ result, pickle }) {
  if (result?.status === Status.FAILED) {
    const img = await page.screenshot({ path: `./test-results-cucumber/screenshots/${pickle.name}.png`, type: "png" });
    this.attach(img, "image/png");
  }
  context.clearCookies();
});

AfterAll(async function() {
  await page.close();
  await context.close();
  if (browser) {
    await browser.close();
  }
});

export {
  page,
  browser,
  context
};
