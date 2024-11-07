import { test, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import ElementUtil from '../utils/elements-utils';

dotenv.config();

let loginUrl: string;
let elementUtils: ElementUtil;

test.beforeAll(async () => {
    loginUrl = process.env.NM_HOMEPAGE_URL;
  //  console.log("playwright hooks before all");
});

test.beforeEach(async ({ page }) => {
 //   console.log("playwright hooks before each");
    elementUtils = new ElementUtil(page);
    await elementUtils.gotoURL(loginUrl);
    console.log(loginUrl);
});

export default test ;
