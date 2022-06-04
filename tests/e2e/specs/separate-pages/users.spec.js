describe("Testing Users page", () => {
  it("checks users info displaying", () => {
    cy.visit("/login");
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.get("nav > a").contains("Users").click();
    cy.get("table").should("exist");
    cy.get("table").contains("th", "Login");
    cy.get("table").contains("th", "Password");
    cy.get("table").contains("th", "Birthdate");
    cy.get("table").should("contain", "admin").and("contain", "1996-10-23");
  });
});
