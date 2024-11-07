@NMInsuranceCalculator
Feature: Life Insurance Calculator
Background: User is navigated to the NM Home page

    Scenario Outline: Testing whether life insurance calculator is functional
        Given User is landed on the NM Home page with the title "Northwestern Mutual | Financial Planning & Life Insurance Company"
        Then User navigates to the Universal Life Insurance page with title "Universal Life Insurance | Northwestern Mutual"
        When User clicks on calculate it button
        Then Verify if the user is navigated to the Life Insurance calculator page with title "Life Insurance Calculator | Northwestern Mutual"
        When User clicks on calculate it button on the Life insurance calculator page
        And User completes the life insurance calculator questionnaire flow with "<Zipcode>", "<Age>", "<Partner Age>", "<No of Kids>", "<Youngest kid age>","<Annual Income>","<Partner Annual Income>"
        Then User is displayed with the results of the calculation estimation
        Examples:
         | Zipcode  |  Age        | Partner Age | No of Kids   | Youngest kid age | Annual Income  | Partner Annual Income|
         | 23233    | 25          | 45          | 2            | 6                |   30000        |  10000               |
         | 42042    | 35          | 65          | 6            | 20               |   20000        |  55000               |

    
        
