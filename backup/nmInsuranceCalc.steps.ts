import { Before, Given, When, Then, setDefaultTimeout, After } from '@cucumber/cucumber';
import { page } from "../support/hooks";
import { test, expect } from '@playwright/test';
import NMHomePage from "./page/nmhome.page";
import ElementUtil from '../utils/elements-utils';
import UniversalLifeInsurancePage from './page/universallifeinsurance.page';
import LifeInsuranceCalculatorPage from './page/lifeinsurancecalculator.page';
import { dependencies , gender, monthlyExpenses, mortgageAmount , debt, assets } from '../utils/enumsused';
import { debugPort } from 'process';
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";




// npx cucumber-js --format allure-cucumberjs/reporter

//let nmhomepage : NMHomePage;
//let universalLifeInsurance: UniversalLifeInsurancePage;
//let lifeInsuranceCalculator: LifeInsuranceCalculatorPage;

var lifeInsuranceCalArr: { [key: string]: string } = {
  dependency       :dependencies.Me_and_my_kids,
  gender           :gender.Male,
  mortgage         :"yes",
  monthlyexpenses  :monthlyExpenses.$10000_or_more,
  mortgageamount   :mortgageAmount.more_than_$1000000,
  debt             :debt.more_than_$500000,
  assets           :assets.less_than_$50000
};

Before(async function () {
  if (!page) {
      throw new Error("Page is not initialized.");
  }  
  this.nmhomepage = new NMHomePage(page);
  //return this.nmhomepage = nmhomepage;

  this.universalLifeInsurance = new UniversalLifeInsurancePage(page);
  //return this.universalLifeInsurance = universalLifeInsurance;  
  //return this.lifeInsuranceCalculator = lifeInsuranceCalculator;  
});

Given('User is landed on the NM Home page with the title {string}', async function (nmHomepageTitle:string) {
  // await allure.epic("Web interface");
  // await allure.feature("Essential features");
  // await allure.story("Authentication");
  this.lifeInsuranceCalculator = new LifeInsuranceCalculatorPage(page);
    await this.nmhomepage.assertTitleText(nmHomepageTitle);

    await page.screenshot({path: 'screenshot.png'});

    // await allure.attachmentPath("NM Home page", "screenshot.png", {
    //   contentType: ContentType.PNG,
    //   fileExtension: "png",
    // });
    
  });

  Then(`User navigates to the Universal Life Insurance page with title {string}`, async function (universalLifeInsurancePageTitle:string) {
    
    await this.nmhomepage.nmHomepageInsuranceDrp();
    await this.nmhomepage.universalLifeInsurance();
    await this.universalLifeInsurance.assertTitleText(universalLifeInsurancePageTitle);

  });

  When('User clicks on calculate it button', async function () {
    
    await this.universalLifeInsurance.scrolltoViewCalculator();   
    await this.universalLifeInsurance.calculateInsurance();

  });

  Then('Verify if the user is navigated to the Life Insurance calculator page with title {string}', async function (lifeInsuranceCalculatorPageTitle:string) {
    
    await this.lifeInsuranceCalculator.assertTitleText(lifeInsuranceCalculatorPageTitle);
    
  });

  When('User clicks on calculate it button on the Life insurance calculator page', async function () {
    
    await this.lifeInsuranceCalculator.calculateLifeInsuranceTrigger();

  });

  When('User completes the life insurance calculator questionnaire flow', async function () {      
   
   // await this.lifeInsuranceCalculator.calculateLifeInsuranceQuestionnaireFlow(lifeInsuranceCalArr); 

  });

  When('User completes the life insurance calculator questionnaire flow with {string}, {string}, {string}, {string}, {string},{string},{string}', async function (zipCodeInp, ageInp, partnerAge, noOfKids,youngestKidAge, annualIncome,partnerAnnualIncome) {
    await this.lifeInsuranceCalculator
    .calculateLifeInsuranceQuestionnaireFlow
    (lifeInsuranceCalArr , zipCodeInp, ageInp, partnerAge, noOfKids, youngestKidAge, annualIncome, partnerAnnualIncome); 
  });

  Then('User is displayed with the results of the calculation estimation', async function () {     
    
    const resultHeader = await this.lifeInsuranceCalculator.getResultHeader();    
    const resultContent = await this.lifeInsuranceCalculator.getreadyToTakeNextStepContentTxt();
    expect(resultHeader).toBe("YOUR ESTIMATE");
    expect(resultContent).toBe("Since this is just an estimate, our advisors can help make sure nothing was overlooked and fine tune your coverage so it’s just right. Plus, they’ll show how life insurance can fit into an overall financial plan along with investing strategies to help you live the life you want. Fill out the info below to get started, and we'll be in touch soon.");
    expect(await this.lifeInsuranceCalculator.getheresWhyYouNeedItTxt()).toBe("And here's why you need it:");
    expect(await this.lifeInsuranceCalculator.getreadyToTakeNextStepTxt()).toBe("Ready to take the next step?");
    console.log(this.lifeInsuranceCalculator.getResultEstimate());
    
  });



   // await page.pause()
   // await universalLifeInsurance.clickit();
    // await page.evaluate("window.scrollTo(0,document.body.scrollHeight)");
    // await page.evaluate("window.scrollBy(0, 100000)");
    // await page.waitForLoadState("domcontentloaded") 


    // while (!(await universalLifeInsurance.waitingForCalculate())) {
      // await page.keyboard.press('PageDown')
  // }
    // await page.mouse.wheel(0, 1000);
    // await universalLifeInsurance.scrolltoViewCalculator()
    // await page.mouse.wheel(d=0,delta_y=100)
   // await universalLifeInsurance.waitingForCalculate();

   // await page.evaluate("window.scrollTo(0,document.body.scrollHeight)");
    //  await page.evaluate(() =>{
    //    window.scrollTo()
    //  }); 

    // await page.evaluate("window.scrollBy(0, 100000)");


 