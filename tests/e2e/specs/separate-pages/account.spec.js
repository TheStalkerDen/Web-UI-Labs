describe("Testing Account page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
  });
  it("checks user data table", () => {
    cy.get("table").should("exist");
    cy.get("td").contains("Login").should("exist");
    cy.get("td").contains("Birthdate").should("exist");
  });
  it("checks displaying admin user data inside table", () => {
    cy.get("td").contains("admin").should("exist");
    cy.get("td").contains("1996-10-23").should("exist");
  });
});
