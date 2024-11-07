

// export const testData={
//     expectedTitle:{
//         homePage:'Northwestern Mutual | Financial Planning & Life Insurance Company',
//     },
//     element:{
//         logo:"//a[@id='header-logo']",
//         Insurance:{
//             lifeInsurance:'Life Insurance',
//             disabilityInsurance:'Disability Insurance'
//         },
//         Investments:{
//             brokerage:'Brokerage Accounts & Services',
//             health:'Private Wealth Management'

//     }
//     },
//     button:{
//         'Find a Financial Advisor':"//a[@id='nmx-nav-link-utility-fafa']",
//         "Let's get started":"//a[@id='home-hero-fa-cta']",
//         'search':"//button[@id='nmx-nav-link-utility-search']"
//     },
//     dropdown:{
//         Insurance:{
//             lifeInsurance:"//a[@id='nmx-nav-link-primary-sub-life-insurance']",
//             disabilityInsurance:"//a[@id='nmx-nav-link-primary-sub-disability-insurance']"
//         },
//         Investments:{
//             brokerage:"//a[@id='nmx-nav-link-primary-sub-brokerage-accounts-services']",
//             health:"//a[@id='nmx-nav-link-primary-sub-investments-private-wealth-management']"
//         }

//     },
//     screenShots:{

//     },
//     reports:{}
// }


export const testData = {

    //navigation bar
    aboutAs: "//a[@id='nmx-nav-link-primary-who-we-are']",
    financialPlanning: "//a[@id='nmx-nav-link-primary-financial-planning']",

    //search
    searchIcon: "//button[@id='nmx-nav-link-utility-search']",
    searchInput: "//input[@id='nmx-search-field']",
    searchButton: "//button[@id='nmx-search-form-submit']",

    //button
    FinancialAdvisorButton: "//a[@id='nmx-nav-link-utility-fafa']",
    LetsgetstartedButton: "//a[@id='home-hero-fa-cta']",

    //dropdown
    dropdownhover: "//a[@id='nmx-nav-link-primary-insurance']",
    dropdownOption: (optionText: string) => `text=${optionText}`,

    //footer
    aboutAsFooter: "//a[@class='sc-hKgJUU bOWMpb sc-kmATbt iIFBIv'][normalize-space()='About Us']",
    newsRoomFooter: "//a[@class='sc-hKgJUU bOWMpb sc-kmATbt iIFBIv'][normalize-space()='Newsroom']"


}