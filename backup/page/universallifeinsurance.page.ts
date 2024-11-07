//a[@id='nmx-nav-link-primary-insurance']

import { Page } from 'playwright';
import ElementUtil from '../../utils/elements-utils';

export default class UniversalLifeInsurancePage {
    private page: Page;
    private elementUtil: ElementUtil;

    // Selectors
    private calculateInsuranceBtn: string;
    private northWesternMutualDifferenceHeading: string;
    private universalLifeInsuranceLnk: string;
    private universalLifeInsuranceGetInsurance: string;


    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.calculateInsuranceBtn = "//a[@id='universal-life-insurance-calc-experience-callout-button']";
        this.northWesternMutualDifferenceHeading = "//*[text()='The Northwestern ']"
        this.universalLifeInsuranceLnk = "//*[@id='nmx-nav-link-primary-sub-level2-universal-life-insurance']"
        this.universalLifeInsuranceGetInsurance = '//a[@id="universal-life-insurance-hero-cta-primary"]'
    }

    async calculateInsurance() {
        await this.elementUtil.scrollIntoViewIfNeeded(this.calculateInsuranceBtn);
        return await this.elementUtil.trigger(this.calculateInsuranceBtn);

    }

    async waitingForCalculate() {
        return this.elementUtil.elementIsVisible(this.calculateInsuranceBtn)
    }

    async scrolltoViewCalculator() {
        return this.elementUtil.scrollIntoViewIfNeeded(this.northWesternMutualDifferenceHeading);
    }

    async clickit(){
        return this.elementUtil.trigger(this.universalLifeInsuranceGetInsurance)
    } 

    assertTitleText(expectedTitle:string){
        return this.elementUtil.verifyPageTitle(expectedTitle);
    }


}