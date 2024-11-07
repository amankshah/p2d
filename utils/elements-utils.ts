import { Page } from "playwright-core";
import { expect } from '@playwright/test';

type WaitForOptions = {
    state?: "visible" | "detached" | "attached" | "hidden";
    timeout?: number;
};

export default class ElementUtil {
    page: any;
    evalString:string;

    constructor(page: any) {
        this.page = page;
    }

    

    async trigger(element: string): Promise<void> {
        return this.performAction(element, async (locator) => {
            await locator.click();
        });
    }


    async gotoURL(url: string): Promise<void> {
        try {
            await this.page.goto(url, { waitUntil: "domcontentloaded", timeout: 60 * 10000 });
        } catch (error) {
            console.error(`Error navigating to URL: ${url}`, error);
        }
    }

    async fill(element: string, value: string): Promise<void> {
        return this.performAction(element, async (locator) =>  await locator.fill(value)
        );
    }

    async waitForElementToBeVisible(element: string): Promise<void> {
        return this.performAction(element, async (locator) => { }, { state: "visible", timeout: 60 * 10000 });
    }

    async waitForElementToBeAttached(element: string): Promise<void> {
        return this.performAction(element, async (locator) => { }, { state: "attached", timeout: 60 * 10000 });
    }
    
    async waitForElementToHidden(element: string): Promise<void> {
        let result;

        try {
            result = await this.page.waitForSelector(element, { state: "detached", timeout: 45000 });
        } catch (error) {
            console.error(`Error waiting for element to be hidden: ${element}`, error);
            throw { name: "ElementNotFoundError", message: `The Element ${element} was not hidden in the given time` };
        } finally {
            console.log(`Completed waiting for element: ${element}`);
        }

        return result;
    }

    async elementIsHidden(element: string): Promise<boolean> {
        return this.checkElementState(element, 'isHidden');
    }

    async elementIsDisabled(element: string): Promise<boolean> {
        return this.checkElementState(element, 'isDisabled');
    }

    async elementIsVisible(element: string): Promise<boolean> {
        return this.performAction(element, async (locator) => locator.isVisible(), { state: "visible", timeout: 60 * 10000 });
    }

    async getTextContent(element: string): Promise<string | null> {
        return this.performAction(element, async (locator) => locator.textContent());
    }


    async getAttributeValue(element: string, attribute: string): Promise<string | null> {
        return this.performAction(element, async (locator) => locator.getAttribute(attribute));
    }

    async getElementInputValue(element: string): Promise<string> {
        return this.performAction(element, async (locator) => locator.inputValue());
    }

    async getCursorFocusedElement(element: string): Promise<boolean> {
        return this.performAction(element, async (locator) => {
        });
    }

    async navigateTo(link: string): Promise<void> {
        try {
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                this.page.click(link)
            ]);
        } catch (error) {
            console.error(`Error navigating to link: ${link}`, error);
        }
    }


    async uploadFiles(element: string, value: string | string[]): Promise<void> {
        return this.performAction(element, async () => {
            await this.page.setInputFiles(element, value);
        });
    }

    
    async onHover(element: string): Promise<void> {
        return this.performAction(element, async (locator) => locator.hover());
    }
    
    async performAction(element: any, action: (locator: any) => Promise<any>, options: WaitForOptions = { state: "visible", timeout: 60 * 10000 }): Promise<any> {
 
        try {
            if (!element) {
                throw new Error('Element selector is undefined or empty');
            }

            const locator = this.page.locator(element);
            if (!locator) {
                throw new Error(`Locator for element '${element}' not found`);
            }
            await locator.waitFor(options); 
            return await action(locator);
        } catch (error) {
            console.error(`Error performing action on element: ${element}`, error);
            throw error; 
        }
    }

    async checkElementState(element: string, state: string): Promise<boolean> {
        try {
            const locator = this.page.locator(element);
            return await locator[state]();
        } catch (error) {
            console.error(`Error checking element state '${state}' for: ${element}`, error);
            return false;
        }
    }
    // Reusable methods for element Interactions
    //Author : Lokesh and Dilip

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        try {
            await expect(this.page).toHaveTitle(expectedTitle);
            console.log(`Title matches the expected value : ${expectedTitle}`);
        } catch (error) {
            console.error(`Title does not match : ${expectedTitle}`);
            throw error;
        }
    }

    async verifyPageURL(expectedURL: string): Promise<void> {
 
        try {
            await expect(this.page).toHaveURL(expectedURL);
            console.log(`URL matches the expected value : ${expectedURL}`);
        } catch (error) {
            console.error(`URL does not match : ${expectedURL}`);
            throw error;
        }
    }
    async textComparison(element: string, expectedText: string): Promise<void> {
        try {
            await expect(this.page.locator(element)).toHaveText(expectedText)
            console.log(`Text matches the expected value : ${expectedText}`);
        } catch (error) {
            console.error(`Text does not match : ${expectedText}`);
            throw error;
        }
    }
 
    async partialTextComparison(element: string, expectedText: string): Promise<void> {
        try {
            await expect(this.page.locator(element)).toContainText(expectedText)
            console.log(`Text matches the expected value : ${expectedText}`);
        } catch (error) {
            console.error(`Text does not match : ${expectedText}`);
            throw error;
        }
    }
 
    async elementEnabled(element: string, expectedText: string): Promise<void> {
        try {
            await expect(this.page.locator(element)).toBeEnabled();
            console.log(`${expectedText} : is enabled `);
        } catch (error) {
            console.error(`${expectedText} : is not enabled `);
            throw error;
        }
    }
 
    async elementDisabled(element: string, expectedText: string): Promise<void> {
        try {
            await expect(this.page.locator(element)).toBeDisabled();
            console.log(`${expectedText} : is Disabled `);
        } catch (error) {
            console.error(`${expectedText} : is not Disabled `);
            throw error;
        }
    }
 
    async verifycount(element: string, expectedCount: number): Promise<void> {
        const locator = this.page.locator(element);
        const locatorCount = await locator.count();
        try {
            expect(locatorCount).toBe(expectedCount);
            console.log(`Count matches the expected : ${locatorCount}`);
        } catch (error) {
            console.error(`Count does not match : ${locatorCount}`);
            throw error;
        }
    }
    async verifyAttributeListed(element: string, expectedText: any, attribute: string): Promise<any> {
        const locators = await this.page.$$(element);
 
        if (locators.length !== expectedText.length) {
            console.error(`Count of elements does not match expected text array length!`);
            throw new Error('Element count and expected text length mismatch.');
        }
 
        try {
            for (let i = 0; i < locators.length; i++) {
                const attributeValue = await locators[i].getAttribute(attribute);
                // Ensure that the text is not null and compare it with the expected value
                expect(attributeValue?.trim()).toBe(expectedText[i].trim());
 
                console.log(`Element ${i + 1} text matches: ${attributeValue?.trim()}`);
            }
 
        } catch (error) {
            console.error(`Text does not match the expected value for some elements.`);
            throw error;
        }
    }
 
    // Dropdown selection
    async selectDropdwonByValue(element: string, dropdownText: string): Promise<void> {
        try {
            const selectElement = await this.page.locator(element);
            await selectElement.selectOption({ value: dropdownText });
           
        } catch (error) {
            console.error(`Error selecting option : ${dropdownText} in element: $(element)`, error);
            throw error;
        }
 
    }
 
    async selectDropdwonByText(element: string, dropdownText: string): Promise<void> {
        try {
            const selectElement = await this.page.locator(element);
            await selectElement.selectOption(dropdownText);
            //this.page.selectDropdwonByText
        } catch (error) {
            console.error(`Error selecting option : ${dropdownText} in element: $(element)`, error);
            throw error;
        }
 
    }
 
    //Scroll to specfic element
    async scrollIntoView(element: string): Promise<void> {
 
        try {
            const selectElement = await this.page.locator(element);
            await selectElement.scrollIntoView();
 
        } catch (error) {
            console.error(`Error while scroll to element: $(element)`, error);
            throw error;
        }
    }

    async scrollIntoViewIfNeeded(element:string, options: WaitForOptions = { state: "visible", timeout: 60 * 10000 }): Promise<void> {
        try{
             return this.performAction(element, async (locator) => locator.scrollIntoViewIfNeeded(options));
         }catch(error){
             console.error(`Error scrolling to the element`,error);
             throw error;
         }
         
     }
 
    // double click
    async onDoubleClick(element: string): Promise<void> {
        return this.performAction(element, async (locator) => locator.dblclick());
    }
 
    // Alert accept and dismiss
 
    async alertAccept(): Promise<void> {
        await this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
    }
 
    async alertDismiss(): Promise<void> {
        await this.page.once('dialog', async (dialog) => {
            await dialog.dismiss();
        });
    }

   

    async getByRole(elementRole:string, elementName:string): Promise<void> {
        try{
             return this.page.getByRole(elementRole, {name: elementName});
         }catch(error){
             console.error(`Error locating the element by Role`,error);
             throw error;
         }
         
     }

     async getAttribute(attributeName:string, options: WaitForOptions = { state: "visible", timeout: 60 * 10000 }): Promise<void> {
        try{
             return this.page.getAttribute(attributeName, options);
         }catch(error){
             console.error(`Error retreiving to the element attribute`,error);
             throw error;
         }
         
     }

     async getByAltText(altText:string, options: {exact:true}): Promise<void> {
        try{
             return this.page.getByAltText(altText, options);
         }catch(error){
             console.error(`Error locating the element by Alt Text`,error);
             throw error;
         }         
     }

     async getByLabel(labelText:string, options: {exact:true}): Promise<void> {
        try{
             return this.page.getByLabel(labelText, options);
         }catch(error){
             console.error(`Error locating the element by Label`,error);
             throw error;
         }
      }

      async getByPlaceHolder(placeHolderText:string, options: {exact:true}): Promise<void> {
        try{
             return this.page.getByPlaceHolder(placeHolderText, options);
         }catch(error){
             console.error(`Error locating the element by Label`,error);
             throw error;
         }
         
     }


    
    
}
