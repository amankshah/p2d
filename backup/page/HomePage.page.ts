import { expect, Page } from "@playwright/test";
import { testData } from "../../utils/testData";
import ElementUtil from "../../utils/elements-utils";
import { homedir } from "os";
import { promises } from "dns";


export default class HomePage{
   
    // private logSelecter=testData.element.logo;
    // private findAdvisorButton=testData.button["Find a Financial Advisor"];
    // private getStartButton=testData.button["Let's get started"];
    // private searchButton=testData.button["search"];
    // private insuranceDropDown=testData.dropdown.Insurance;
    // private investmentDropDown=testData.dropdown.Investments;
    // private insuranceText=testData.element.Insurance;
    // private investmentText=testData.element.Investments;
    private page:Page
    private elementUtil:ElementUtil;
    private url;

    constructor(page:Page){
        this.page=page;
        this.elementUtil=new ElementUtil(page);
        this.url=process.env.NWMUTUAL_HOMEPAGE_URL;
        
    }

    async navigatTo(url:string){
        
        return this.elementUtil.gotoURL(this.url);
    }

    // async verifyTitle(expectedTitle){
    //     const actualtitle=await this.page.title();
    //     expect(actualtitle).toEqual(expectedTitle);
        
    //     // await title===testData.expectedTitle.homePage;
    // }

    // async isLogoVisible(){
    //    await this.elementUtil.elementIsVisible(this.logSelecter);
    // }
    // async isFindAdvisorButtonClick(button){
       
    //     await this.elementUtil.trigger(this.findAdvisorButton);

    // }
    private sectionLocators={
    'About Us':testData.aboutAs,
    'Financial Planning':testData.financialPlanning
    };

    async navigateMenu(section:string){
        const locator=this.sectionLocators[section];
        if(locator){
            await this.elementUtil.trigger(testData.aboutAs);
        }else{
            throw new Error(`Unknown section:${section}`);
        }
    }

    async navigateAboutUs(){
        await this.elementUtil.trigger(testData.aboutAs);
    }
    async navigateFinacialPlaning(){
        await this.elementUtil.trigger(testData.financialPlanning);
    }

    async searchIconClick(){
        await this.elementUtil.trigger(testData.searchIcon);
    }
    async searchBar(query:string){
        await this.elementUtil.fill(testData.searchInput,query);
        await this.elementUtil.trigger(testData.searchButton);
    }

    async searchClick(){
        await this.elementUtil.trigger(testData.searchButton);
    }

    async isGetStartedButtonClick(){
        await this.elementUtil.trigger(testData.LetsgetstartedButton);

    }
    async isFinancialAdviserButtonClick(){
        await this.elementUtil.trigger(testData.FinancialAdvisorButton);

    }
    async openInsuranceDropDown(optionText:string){
        
        await this.elementUtil.onHover(testData.dropdownhover);
        await this.elementUtil.trigger(testData.dropdownOption(optionText));
    }
   
    async verifyAboutUsFooterLink(){
        await this.elementUtil.trigger(testData.aboutAsFooter);
    }
    async verifyNewsroomFooterLink(){
        await this.elementUtil.trigger(testData.newsRoomFooter);
    }

    async fillFinancialPlanning(query:string){
        await this.elementUtil.fill(testData.searchInput, query);
    }



}