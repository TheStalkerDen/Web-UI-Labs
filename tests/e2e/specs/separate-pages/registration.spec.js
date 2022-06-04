describe("Tests the Registration page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });
  it("tries to register with empty input data", () => {
    cy.get("input[name='login']").should("contain", "");
    cy.get("input[name='password']").should("contain", "");
    cy.get("input[name='date']").should("contain", "");
    cy.get("button").contains("Register").should("be.disabled");
  });
  it("tries to register with existed login name", () => {
    cy.get("input[name='login']").type("admin");
    cy.get("input[name='login'").should("have.class", "is-invalid");
    cy.get("div").contains("This user already exist").should("exist");
  });
  it("tries to register new user", () => {
    cy.get("input[name='login']").type("newUser");
    cy.get("input[name='password']").type("pass");
    cy.get("input[name='date']").type("1999-09-09");
    cy.get("button").contains("Register").click();
    cy.url().should("contain", "/login");
  });
});
