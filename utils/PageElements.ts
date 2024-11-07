export const pageElements = {
    LoginPage : {

        // Login Form Field 
            url:"https://automationexercise.com/login",
            sectionHeader:".login-form h2",
            EmailField:"input[data-qa='login-email']",
            PasswordField:"input[data-qa='login-password']",
            loginButton:"button[data-qa='login-button']",

            //Constants
            EXPECTED_SECTION_HEADER :"Login to your account"

    }
}