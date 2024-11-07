import { Page } from 'playwright';
import ElementUtil from '../../utils/elements-utils';
import { dependencies, gender, monthlyExpenses, mortgageAmount, debt, assets } from '../../utils/enumsused';
import { expect } from 'playwright/test';

export default class LifeInsuranceCalculatorPage {
    private page: Page;
    private elementUtil: ElementUtil;

    // Selectors
    private calculateItBtn: string; 
    //submit button
    private submitBtn: string;
    //input boxes
    private textInput:string;
    private zipCodeInp : string;
    private ageInp : string;
    private partnerAgeInp:string;
    private noOfKidsInp: string;
    private ageOfYoungestKidInp : string;
    private yearlyIncomeInp: string;
    private yearlyIncomePartnerInp:string;
    //radio
    private mortgageNoRad: string;
    private mortgageYesRad: string;  
    //results
    private resultHeaderTxt:string; 
    private resultEstimateTxt:string;  
    private heresWhyYouNeedItTxt:string;
    private readyToTakeNextStepTxt:string;
    private readyToTakeNextStepContentTxt:string;


    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        //pagesObjects
        this.calculateItBtn = "//*[@id='calculateItButton']";
        this.submitBtn = "//button[@id='submitButton']";
        
        this.textInput = "//*[@id='[object Object]']/input"; 
      //  this.zipCodeInp = "//*[@id='[object Object]']/input"; 
        this.ageInp = "//input[@placeholder='Enter your age']";

        this.partnerAgeInp = "//input[@placeholder='Enter partner’s age']"
        this.noOfKidsInp = "//input[@placeholder='Enter number of kids']";
        this.ageOfYoungestKidInp = "//input[@placeholder='Enter age of youngest kid']";
        this.yearlyIncomeInp = "//*[text()='How much do you make ']/following-sibling::div[@id='[object Object]']/input"; 
        this.yearlyIncomePartnerInp = "//*[text()='How much does your partner make in a year?']/following-sibling::div[@id='[object Object]']/input";     
        
        this.mortgageYesRad = "//div[@id='radio_0']";
        this.mortgageNoRad = "//div[@id='radio_1']";  
        
        this.resultHeaderTxt = "//header[@aria-label='Results Header']/h1";
        this.resultEstimateTxt = "//header[@aria-label='Results Header']/h2[1]";
        this.heresWhyYouNeedItTxt = "//header[@aria-label='Results Header']/section/div[1]";
        this.readyToTakeNextStepTxt = "//*[@aria-label='Connect with a Financial Representative']/div[2]/div/div/h1";
        this.readyToTakeNextStepContentTxt = "//*[@aria-label='Connect with a Financial Representative']/div[2]/div/div/h2/p";
    }

    private getDropdownBody(itemName: string): string {
        try{
        var dropDownBody = `(//*[@id='${itemName}'])[2]/div/div[1]`;
        return dropDownBody;
        }catch(error){
            console.log(`Failed to build the locator for ${dropDownBody}`)
        }        
    }

    private selectDropdownWithText(itemName: string): string {
        try{
        var dropDownOptionWithText = `//*[text()='${itemName}' and contains(@id, 'react-select')]`;
        return dropDownOptionWithText;
        }catch(error){
            console.log(`Failed to build the locator for ${dropDownOptionWithText}`)
        }  
    }
    

    async calculateLifeInsuranceTrigger() {
        return this.elementUtil.trigger(this.calculateItBtn);
    }

    async calculateLifeInsuranceQuestionnaireFlow(lifeInsuranceCalArr: { [key: string]: string }, zipCodeInp:string, ageInp:string, partnerAge:string, noOfKids:string, youngestKidAge:string, annualIncome:string, partnerAnnualIncome:string){
       
        await this.elementUtil.trigger(this.getDropdownBody("dependencies"));
        await this.elementUtil.trigger(this.selectDropdownWithText(lifeInsuranceCalArr.dependency));
        await this.elementUtil.trigger(this.submitBtn);

        await this.elementUtil.fill(this.textInput, zipCodeInp);
        await this.elementUtil.trigger(this.submitBtn);

        await this.elementUtil.trigger(this.getDropdownBody("gender"));
        await this.elementUtil.trigger(this.selectDropdownWithText(lifeInsuranceCalArr.gender));
        await this.elementUtil.trigger(this.submitBtn);

        await this.elementUtil.fill(this.textInput, ageInp);
        await this.elementUtil.trigger(this.submitBtn);
        // await this.page.pause();

        if(lifeInsuranceCalArr.dependency == dependencies.Me_and_my_partner){
                await this.elementUtil.fill(this.partnerAgeInp, partnerAge);
                await this.elementUtil.trigger(this.submitBtn);
        }

        if(lifeInsuranceCalArr.dependency == dependencies.Me_and_my_kids || 
            lifeInsuranceCalArr.dependency == dependencies.Me_my_partner_and_my_kids )
        {
            if(lifeInsuranceCalArr.dependency == dependencies.Me_my_partner_and_my_kids){

                await this.elementUtil.fill(this.partnerAgeInp, partnerAge);
                await this.elementUtil.trigger(this.submitBtn);
            }
            await this.elementUtil.fill(this.noOfKidsInp, noOfKids);
            await this.elementUtil.trigger(this.submitBtn);
            //this.page.pause();
            await this.elementUtil.fill(this.ageOfYoungestKidInp, youngestKidAge);
            await this.elementUtil.trigger(this.submitBtn);
        }
        await this.elementUtil.fill(this.yearlyIncomeInp, annualIncome);        
        await this.elementUtil.trigger(this.submitBtn);

        if(lifeInsuranceCalArr.dependency == dependencies.Me_my_partner_and_my_kids
            || lifeInsuranceCalArr.dependency == dependencies.Me_and_my_partner)
        {
        await this.elementUtil.fill(this.yearlyIncomePartnerInp, partnerAnnualIncome);
        await this.elementUtil.trigger(this.submitBtn);
        }
        await this.elementUtil.trigger(this.getDropdownBody("monthlyExpenses"));
        await this.elementUtil.trigger(this.selectDropdownWithText(lifeInsuranceCalArr.monthlyexpenses));
        await this.elementUtil.trigger(this.submitBtn);

        if(lifeInsuranceCalArr.mortgage == "yes"){

            await this.elementUtil.trigger(this.mortgageYesRad);
            await this.elementUtil.trigger(this.submitBtn);

            await this.elementUtil.trigger(this.getDropdownBody("mortgageOutstanding"));
            await this.elementUtil.trigger(this.selectDropdownWithText(lifeInsuranceCalArr.mortgageamount));
            await this.elementUtil.trigger(this.submitBtn);
        }
        else{
            await this.elementUtil.trigger(this.mortgageNoRad);
            await this.elementUtil.trigger(this.submitBtn);
        }

        await this.elementUtil.trigger(this.getDropdownBody("debt"));
        await this.elementUtil.trigger(this.selectDropdownWithText(lifeInsuranceCalArr.debt));
        await this.elementUtil.trigger(this.submitBtn);

        await this.elementUtil.trigger(this.getDropdownBody("assets"));
        await this.elementUtil.trigger(this.selectDropdownWithText(lifeInsuranceCalArr.assets));
        await this.elementUtil.trigger(this.submitBtn);
       // this.page.pause();
    }

    getResultHeader() :Promise<string>{
        return this.elementUtil.getTextContent(this.resultHeaderTxt);        
    }

    getResultEstimate() :Promise<string>{
        return this.elementUtil.getTextContent(this.resultEstimateTxt);        
    }

    getheresWhyYouNeedItTxt() :Promise<string>{
        return this.elementUtil.getTextContent(this.heresWhyYouNeedItTxt);        
    }

    getreadyToTakeNextStepTxt() :Promise<string>{
        return this.elementUtil.getTextContent(this.readyToTakeNextStepTxt);        
    }

    getreadyToTakeNextStepContentTxt() :Promise<string>{
        return this.elementUtil.getTextContent(this.readyToTakeNextStepContentTxt);        
    }

    assertTitleText(expectedTitle:string){
        return this.elementUtil.verifyPageTitle(expectedTitle);
    }

}

