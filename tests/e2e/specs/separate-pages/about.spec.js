describe("Tests the About page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("nav > a").contains("About").click();
  });
  it("visits the about page from home page", () => {
    cy.url().should("include", "/about");
  });
  it("checks that About page contains name of app's creator", () => {
    cy.get("p").should("contain", "Yermolenko Denys");
  });
  it("checks that About page contains app's logo", () => {
    cy.get("img").should("have.attr", "alt", "logo-image");
  });
});
