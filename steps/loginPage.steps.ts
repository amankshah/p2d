import { Before, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { page } from "../support/hooks";
import ElementUtil from '../utils/elements-utils';
import { pageElements } from '../utils/PageElements';
import { pageObjectManager } from '../utils/pageObjectManager';
import { test, expect } from '@playwright/test';

setDefaultTimeout(60 * 1000);

Before(async function () {
  if (!page) {
    throw new Error("Page is not initialized.");
  }
  this.POManager = new pageObjectManager(page);
   this.loginPage = await this.POManager.getLoginPage();
  console.log("Page objects initialized.");
});

Given('the browser is launched', async function () {
  console.log("The browser is launched");
  this.elementUtils = new ElementUtil(page);
  
  await this.elementUtils.gotoURL(pageElements.LoginPage.url);
  console.log("Navigated to URL:", pageElements.LoginPage.url);

  await this.loginPage.verifyLoginPage();
  expect(await this.loginPage.loginPageHeader).toContainText(this.loginPage.expectedLoginPageHeader);
  await this.loginPage.fillLoginEmail("aman@gmail.com");
  console.log("Login email filled.");
});

When('the user navigates to {string}', async function (url: string) {
  console.log(`The user navigates to ${url}`);
  await this.elementUtils.gotoURL(url);
  console.log(`Navigated to ${url}`);
});



  Then('the home page should be visible successfully', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("the home page should be visible successfully")
   
  });


  When('the user clicks on {string} button', async function (string) {
    // Write code here that turns the phrase above into concrete actions
   
  });


  Then('{string} should be visible', async function (string) {
    // Write code here that turns the phrase above into concrete actions
   
  });


  When('the user enters name', async function () {
    // Write code here that turns the phrase above into concrete actions
   
  });


  When('the user enters an email without {string} or without extension {string}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
   
  });


  When('the user clicks {string} button', async function (string) {
    // Write code here that turns the phrase above into concrete actions
   
  });


  Then('the user should not be able to proceed further', async function () {
    // Write code here that turns the phrase above into concrete actions
   
  });