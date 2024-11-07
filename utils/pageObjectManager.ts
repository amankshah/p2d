import { Page } from "@playwright/test";
import { LoginPage } from "../page/Login.page";
import { pageElements } from "./PageElements";

export class pageObjectManager {
    private page: Page;
    private loginPage: LoginPage;
    private pageElements: typeof pageElements;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.pageElements = pageElements;
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getPageElements(): typeof pageElements {
        return this.pageElements;
    }
}
