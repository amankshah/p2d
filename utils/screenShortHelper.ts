import { Page } from "@playwright/test";
import fs = require('fs-extra');
import path = require("path");

async function directory(directory:string) {
  if(!(await fs.pathExists(directory)))
    await fs.mkdir(directory);
  
}


    export async function takeScreenshot(page: Page, screenshotName: string) {
      const screenshotDir = path.join(__dirname,'../screenshots');                            
        await directory(screenshotDir);                                            
        const screenshotPath = path.join(screenshotDir, `${screenshotName}.png`);
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved at: ${screenshotPath}`);
      }
