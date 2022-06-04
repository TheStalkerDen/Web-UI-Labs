describe("Tests the Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("tries to login without input data", () => {
    cy.get('input[name="login"]').should("contain", "");
    cy.get('input[name="password"]').should("contain", "");
    cy.get("button").should("be.disabled");
  });
  it("tries to login without password", () => {
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').should("contain", "");
    cy.get("button").should("be.disabled");
  });
  it("tries to login without login", () => {
    cy.get('input[name="login"]').should("contain", "");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").should("be.disabled");
  });
  it("tries to login with non-exist login", () => {
    cy.get('input[name="login"]').type("non-exist");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.url().should("contain", "/login");
    cy.get("nav > a").contains("Logout").should("not.exist");
  });
  it("tries to login with incorrect password", () => {
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("incorrect");
    cy.get("button").contains("Login").click();
    cy.url().should("contain", "/login");
    cy.get("nav > a").contains("Logout").should("not.exist");
  });
  it("tries to login as admin", () => {
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.url().should("contain", "/account");
    cy.get("nav > a").contains("Logout").should("exist");
  });
});
