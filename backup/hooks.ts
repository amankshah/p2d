import {After, Before, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, firefox } from 'playwright';
import ElementUtil from '../utils/elements-utils';
import SetmoreLogin from './page/app.page';
import SauseDemoLogin from './page/sauseedemo.page';
import * as dotenv from 'dotenv'; 
import { getScenarioDescription } from '@cucumber/cucumber/lib/formatter/helpers/pickle_parser';
const {playwright} = require('@playwright/test');
import {pageObjectManager} from '../utils/pageObjectManager';
import {pageElements} from "../utils/PageElements"
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
//   this.setmoreLogin = new SetmoreLogin(page);
//   this.sauseDemo = new SauseDemoLogin(page);
//  // this.NMHomepage = new 
this.poManger = new pageObjectManager(page);
//   this.elementUtils = new ElementUtil(page);

//   let loginUrl;
//   let email;
//   let password;

//   const tags = scenario.pickle.tags.map(tag => tag.name);

//   if (tags.includes('@setmoreLogin')) {
//       loginUrl = process.env.SETMORE_LOGIN_URL;
//       email = process.env.SETMORE_EMAIL;
//       password = process.env.SETMORE_PASSWORD;
//   } else if (tags.includes('@SauseDemo')) {
//       loginUrl = process.env.SAUCEDEMO_LOGIN_URL;
//       email = process.env.SAUCEDEMO_EMAIL;
//       password = process.env.SAUCEDEMO_PASSWORD;
//   } else if (tags.includes('@NMInsuranceCalculator')){
//       loginUrl = process.env.NM_HOMEPAGE_URL;
//   }


  await this.elementUtils.gotoURL(pageElements.LoginPage.url);
  
  

//   if (tags.includes('@setmoreLogin')) {
//       await this.setmoreLogin.setmoreLoginPageEmailField(email);
//       await this.setmoreLogin.setmoreLoginPagePasswordField(password);
//       await this.setmoreLogin.setmoreLoginPageButton();
//   } else if (tags.includes('@SauseDemo')) {
//       await this.sauseDemo.sauseDemoLoginPageEmailField(email);
//       await this.sauseDemo.sauseDemoLoginPagePasswordField(password);
//       await this.sauseDemo.sauseDemoLoginPageButton();
//   }
});

BeforeStep( function(){


});

AfterStep(async function({result, pickle}){
  if (result.status === Status.FAILED) {
    await page.screenshot({path:  "failed-screenshots/" + pickle.steps+'-ss.png'});
    //const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
   // await delay(500000);
  }
  else if (result.status === Status.PASSED) {
    await page.screenshot({path:  "passed-screenshots/" + (new Date()).getMilliseconds() +'-ss.png'});
    //const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
   // await delay(500000);
  }
});

After(async function ({result, pickle}) {

  if(result?.status==Status.FAILED){
 
    const img = await page.screenshot({ path:`./test-results-cucumber/screenshots/${pickle.name}.png`, type: "png"});
    this.attach(img, "image/png");
  }

  context.clearCookies();
  
});


AfterAll(async function () {
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
