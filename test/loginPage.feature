Feature: Automation Exercise Website Tests

Scenario: Verify that the login page is accessible
  Given the browser is launched
  When user navigates to the login page
  Then user should see the login page header as "Login to your account"



Scenario: Verify that user can see and fill the login form
  Given the browser is launched
  When user navigates to the login page
  Then user should see the login page header as "Login to your account"
  When user enters the username "aman@gmail.com"
  And user enters the password "aman2024"
  And user clicks on the login button
  Then user should be logged in
  And user should see "Hello!"
