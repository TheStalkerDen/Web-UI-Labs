describe("Testing polling page with an unauthorized user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("a[href='/questions/1']").click();
  });
  it("checks alert for unauthorized user", () => {
    cy.get("div.alert")
      .contains("Only registered users can part in polling!")
      .should("exist");
  });
  it("checks card shows vote numbers", () => {
    cy.get(".list-group").contains("0 |");
  });
});

describe("Test polling page with user=admin", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.get("nav > a").contains("Home").click();
    cy.get("a[href='/questions/1']").click();
  });
  it("checks voting for some answer in question 1", () => {
    cy.get(".list-group")
      .contains("Denys Yermolenko")
      .find("input[type=radio]")
      .click();
    cy.get("#vote-button").click();
    cy.get(".alert-info").contains("Thank you for your vote!").should("exist");
    cy.get(".list-group").contains("1 | Denys").should("exist");
    cy.get(".list-group").contains("0 | Ivan").should("exist");
  });
  it("checks polling deleting", () => {
    cy.get("#deletePolling").click();
    cy.url().should("contain", "/home");
  });
});
