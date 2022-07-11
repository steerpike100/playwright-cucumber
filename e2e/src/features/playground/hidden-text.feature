Feature: As a user I can interact with hidden and displayed text

  @dev
  @smoke
  @regression
  Scenario: As a user I can interact and assert on hidden and displayed text
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "show hide text" should be displayed
    And the "show hide text" should contain the text "This is visible"
    Then I click the "show hide button" button
    And the "show hide text" should not be displayed