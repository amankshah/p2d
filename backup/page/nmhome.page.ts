//a[@id='nmx-nav-link-primary-insurance']

import { Page } from 'playwright';
import ElementUtil from '../../utils/elements-utils';

export default class NMHomepage {
    private page: Page;
    private elementUtil: ElementUtil;

    // Selectors
    private insuranceDrp: string;
    private wholeLifeInsuranceLnk: string;
    private universalLifeInsuranceLnk: string;
    private northwestMutualLogoTxt:string;


    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.insuranceDrp = "//a[@id='nmx-nav-link-primary-insurance']";
      //  this.wholeLifeInsuranceLnk = "//a[@id='nmx-nav-link-primary-sub-level2-whole-life-insurance']"
        this.universalLifeInsuranceLnk = "//a[@id='nmx-nav-link-primary-sub-level2-universal-life-insurance']"
        this.northwestMutualLogoTxt = "//*[@id='header-logo']";
    }

    async nmHomepageTitle(){
        return this.elementUtil.verifyPageTitle("expeccc");
    }

    async nmHomepageInsuranceDrp() {
        return this.elementUtil.onHover(this.insuranceDrp);

    }

    async universalLifeInsurance() {
        return this.elementUtil.trigger(this.universalLifeInsuranceLnk);

    }

    assertTitleText(expectedTitle:string){
        return this.elementUtil.verifyPageTitle(expectedTitle);
    }


}

