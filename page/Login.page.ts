import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../utils/testData";
import ElementUtil from "../utils/elements-utils";
import { pageElements } from "../utils/PageElements";

import { homedir } from "os";
import { promises } from "dns";

export class LoginPage {
    private page: Page;
    // private elementUtil: ElementUtil;
   

    private LoginPageUrl: string;
    private LoginEmailField:Locator;
    private LoginPasswordField:Locator;
    private LoginButton:Locator;
    private loginPageHeader:Locator;
    private expectedLoginPageHeader:string;

    constructor(page: Page) {
        this.page = page;
        this.LoginPageUrl = pageElements.LoginPage.url;
        this.loginPageHeader = page.locator(pageElements.LoginPage.sectionHeader);
        this.expectedLoginPageHeader = pageElements.LoginPage.EXPECTED_SECTION_HEADER;
        this.LoginEmailField = page.locator(pageElements.LoginPage.EmailField);
        this.LoginPasswordField = page.locator(pageElements.LoginPage.PasswordField);
        this.LoginButton = page.locator(pageElements.LoginPage.loginButton);
    }

    async goToLoginPage() {
        await this.page.goto(this.LoginPageUrl);
      }
      async verifyLoginPage() {
      
        expect(this.loginPageHeader).toContainText(this.expectedLoginPageHeader);
        console.log((this.loginPageHeader.textContent()));
        return this
      }
        
      async fillLoginEmail(loginEmail:string){
        await this.LoginEmailField.fill(loginEmail);
        this.page.pause();
        return this
      }
      
      async fillPassword(loginPassword:string){
        await this.LoginPasswordField.fill(loginPassword);
        return this
      }

      async clickLoginButton(){
        await this.LoginButton.click();
        return this
      }

      async loginUser(loginEmail:string, loginPassword:string) {
        await this.LoginEmailField.fill(loginEmail);
        await this.LoginPasswordField.fill(loginPassword);
        await this.LoginButton.click();
        console.log("Logged In User : " + loginEmail);
      }
}
