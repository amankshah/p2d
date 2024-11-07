import {Page, expect} from '@playwright/test';
import test from '../setup/playwright-hooks';
import { chromium} from 'playwright';
import { before } from 'node:test';
//import { page } from "../support/hooks";
import NMHomePage from "./page/nmhome.page";
import ElementUtil from '../utils/elements-utils';
import UniversalLifeInsurancePage from './page/universallifeinsurance.page';
import LifeInsuranceCalculatorPage from './page/lifeinsurancecalculator.page';
import { dependencies , gender, monthlyExpenses, mortgageAmount , debt, assets } from '../utils/enumsused';
import { debugPort } from 'process';



let nmhomepage : NMHomePage;
let universalLifeInsurance: UniversalLifeInsurancePage;
let lifeInsuranceCalculator: LifeInsuranceCalculatorPage;
let page:Page;

var lifeInsuranceCalArr: { [key: string]: string } = {
    dependency       :dependencies.Me_and_my_kids,
    gender           :gender.Male,
    mortgage         :"yes",
    monthlyexpenses  :monthlyExpenses.$10000_or_more,
    mortgageamount   :mortgageAmount.more_than_$1000000,
    debt             :debt.more_than_$500000,
    assets           :assets.less_than_$50000
};


test.beforeEach("config settings", async ({page})=>{   

    if (!page) {
        throw new Error("Page is not initialized.");
    }  
   // this.page = page;
//    const browser = await chromium.launch();
//    const context = await browser.newContext();
//    const page1 = await context.newPage();

//    page1.goto("https://www.google.com");
  //  console.log("playwright before each");
    
    nmhomepage = new NMHomePage(page);
    universalLifeInsurance = new UniversalLifeInsurancePage(page);
    lifeInsuranceCalculator = new LifeInsuranceCalculatorPage(page);
    universalLifeInsurance = universalLifeInsurance;
    return nmhomepage = nmhomepage;
});

test("Testing the NM Insurance calculator",async ()=>{

    await nmhomepage.assertTitleText("Northwestern Mutual | Financial Planning & Life Insurance Company");
    await nmhomepage.nmHomepageInsuranceDrp();
    await nmhomepage.universalLifeInsurance();
    await universalLifeInsurance.scrolltoViewCalculator();   
    await universalLifeInsurance.calculateInsurance();
    await lifeInsuranceCalculator.calculateLifeInsuranceTrigger();
    await lifeInsuranceCalculator
    .calculateLifeInsuranceQuestionnaireFlow
    (lifeInsuranceCalArr, "43200" , "35", "45", "2" , "6", "20000", "30000"); 
    const resultHeader = await lifeInsuranceCalculator.getResultHeader();    
    const resultContent = await lifeInsuranceCalculator.getreadyToTakeNextStepContentTxt();
    expect(resultHeader).toBe("YOUR ESTIMATE");
    expect(resultContent).toBe("Since this is just an estimate, our advisors can help make sure nothing was overlooked and fine tune your coverage so it’s just right. Plus, they’ll show how life insurance can fit into an overall financial plan along with investing strategies to help you live the life you want. Fill out the info below to get started, and we'll be in touch soon.");
    expect(await lifeInsuranceCalculator.getheresWhyYouNeedItTxt()).toBe("And here's why you need it:");
    expect(await lifeInsuranceCalculator.getreadyToTakeNextStepTxt()).toBe("Ready to take the next step?");
  //  console.log(lifeInsuranceCalculator.getResultEstimate());

});