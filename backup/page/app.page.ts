// import { Page } from 'playwright';
// import ElementUtil from '../utils/elements-utils';

// export default class SetmoreLogin {
//     private page: Page;
//     private elementUtil: ElementUtil;
//     private setmoreLoginEmail: string;
//     private setmoreLoginPassword: string;
//     private setmoreLoginButton: string;
//     private setmoreCalendarSideButton: string;
//     private setmoreContactsPage: string;

//     constructor(page: Page) {
//         this.page = page;
//         this.elementUtil = new ElementUtil(page);
//         this.setmoreLoginEmail = '//input[@class="email-field"]';
//         this.setmoreLoginPassword = '//input[@class="password-field"]';
//         this.setmoreLoginButton = '//a[@id="login-now"]';
//         this.setmoreCalendarSideButton = '//button[@data-testid="sidebar-trigger"]';
//         this.setmoreContactsPage = '//a[@data-testid="contacts"]';
//     }

//     async waitForSetmoreLoginEmailField() {
//         return this.elementUtil.elementIsVisible(this.setmoreLoginEmail);
//     }

//     async waitForSetmoreLoginPasswordField() {
//         return this.elementUtil.elementIsVisible(this.setmoreLoginPassword);
//     }

//     async waitForSetmoreLoginButton() {
//         return this.elementUtil.elementIsVisible(this.setmoreLoginButton);
//     }

//     async waitForSetmoreCalenderSideButton() {
//         return this.elementUtil.waitForElementToBeVisible(this.setmoreCalendarSideButton);
//     }

//     async waitForSetmoreContactsComponent() {
//         return this.elementUtil.waitForElementToBeVisible(this.setmoreContactsPage)
//     }

//     //Below funtions are all action function

//     async setmoreLoginPageEmailField(email: string): Promise<void> {
//         return this.elementUtil.fill(this.setmoreLoginEmail, email);
//     }

//     async setmoreLoginPagePasswordField(password: any): Promise<void> {
//         return this.elementUtil.fill(this.setmoreLoginPassword, password);
//     }

//     async setmoreLoginPageButton(): Promise<void> {
//         return this.elementUtil.trigger(this.setmoreLoginButton);
//     }

//     async setmoreContactsComponent(): Promise<void> {
//         return this.elementUtil.trigger(this.setmoreContactsPage);
//     }
// }


import { Page } from 'playwright';
import ElementUtil from '../../utils/elements-utils';
import setmoreLoginStore from '../../store/setmore-login-store'; 

export default class SetmoreLogin {
    private page: Page;
    private elementUtil: ElementUtil;

    // Selectors
    private setmoreLoginEmail: string;
    private setmoreLoginPassword: string;
    private setmoreLoginButton: string;
    private setmoreCalendarSideButton: string;
    private setmoreContactsPage: string;

    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.setmoreLoginEmail = '//input[@class="email-field"]';
        this.setmoreLoginPassword = '//input[@class="password-field"]';
        this.setmoreLoginButton = '//a[@id="login-now"]';
        this.setmoreCalendarSideButton = '//button[@data-testid="sidebar-trigger"]';
        this.setmoreContactsPage = '//a[@data-testid="contacts"]';
    }

    async waitForSetmoreLoginEmailField() {
        return this.elementUtil.elementIsVisible(this.setmoreLoginEmail);
    }

    async waitForSetmoreLoginPasswordField() {
        return this.elementUtil.elementIsVisible(this.setmoreLoginPassword);
    }

    async waitForSetmoreLoginButton() {
        return this.elementUtil.elementIsVisible(this.setmoreLoginButton);
    }

    async waitForSetmoreCalenderSideButton() {
        return this.elementUtil.waitForElementToBeVisible(this.setmoreCalendarSideButton);
    }

    async waitForSetmoreContactsComponent() {
        return this.elementUtil.waitForElementToBeVisible(this.setmoreContactsPage);
    }

    // Action functions
    async setmoreLoginPageEmailField(email: string): Promise<void> {
        setmoreLoginStore.setEmail(email);
        await this.elementUtil.fill(this.setmoreLoginEmail, email);
    }

    async setmoreLoginPagePasswordField(password: string): Promise<void> {
        setmoreLoginStore.setPassword(password);
        await this.elementUtil.fill(this.setmoreLoginPassword, password);
    }

    async setmoreLoginPageButton(): Promise<void> {
        await this.elementUtil.trigger(this.setmoreLoginButton);
        const loginSuccess = true; 
        setmoreLoginStore.setLoginStatus(loginSuccess);
    }

    async setmoreContactsComponent(): Promise<void> {
        return this.elementUtil.trigger(this.setmoreContactsPage);
    }
}
