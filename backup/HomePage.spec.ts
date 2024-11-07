import HomePage from "./page/HomePage.page";
import { expect } from '@playwright/test';
import { testData } from "../utils/testData";
import { page } from "../support/hooks";
import { takeScreenshot } from "../utils/screenShortHelper";
import test from '../setup/playwright-hooks';

let homePage : HomePage;


test.describe('NorthWestMutual HomePage',()=>{
    
    test.beforeEach(async({page})=>{
        if (!page) 
            {
             throw new Error("Page is not initialized.");
            }  
        homePage = new HomePage(page);

    });

    test('perform search on the home page', async({page})=>{
        await homePage.searchIconClick();
        await homePage.fillFinancialPlanning('financial planning');
        await homePage.searchClick();
      //  await expect(page.locator('text=Result for "financial planning"')).toBeVisible();
        await takeScreenshot(page,'search-financial-planning');

    })
});

