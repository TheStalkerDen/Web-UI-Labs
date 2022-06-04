describe("Testing Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("tries to click question card", () => {
    cy.get("a[href='/questions/1']").click();
    cy.url().should("contain", "/questions/1");
  });
  it("checks alert div when user is unauthorized", () => {
    cy.get("div.alert")
      .contains(
        "Only registered users can add new questions and take part in polling"
      )
      .should("exist");
  });
  it("check `Create new polling` button", () => {
    cy.visit("/login");
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.get("nav > a").contains("Home").click();
    cy.contains("button", "Create new polling").click();
    cy.url().should("contain", "/create-question");
  });
  it("check card displaying info of the mock question", () => {
    cy.get("a[href='/questions/1']")
      .should("contain", "Who created this site?")
      .and("contain", "0 users answer")
      .and("contain", "Created by: admin");
  });
});
