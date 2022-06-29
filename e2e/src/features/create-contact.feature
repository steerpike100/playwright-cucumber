Feature: As a user I expect to be able to create contacts with

  @dev
  Scenario: As a user I expect to be able to create a new contacts with
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"