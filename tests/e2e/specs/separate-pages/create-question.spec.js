describe("Testing CreateQuestion page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.get("nav > a").contains("Home").click();
    cy.contains("button", "Create new polling").click();
  });
  it("tries to create new polling without any data", () => {
    cy.get("input[name='question-text']").should("contain", "");
    cy.get("div.card > ol").should("not.exist");
    cy.get("#startPolling").should("be.disabled");
  });
  it("tries to add empty answer", () => {
    cy.get("input[name='answer-text']").should("contain", "");
    cy.get("#addAnswer").should("be.disabled");
  });
  it("add 1 answer", () => {
    cy.get("input[name='answer-text']").type("Answer 1");
    cy.get("#addAnswer").click();
    cy.get(".list-group").find(".list-group-item").should("have.length", 1);
  });
  it("add 2 answer and delete one of them", () => {
    cy.get("input[name='answer-text']").type("Answer 1");
    cy.get("#addAnswer").click();
    cy.get("input[name='answer-text']").type("Answer 2");
    cy.get("#addAnswer").click();
    cy.get(".list-group").find(".list-group-item").should("have.length", 2);
    cy.get(".list-group").contains("Answer 1").contains("button", "X").click();
    cy.get(".list-group").find(".list-group-item").should("have.length", 1);
  });
  it("start new polling", () => {
    cy.get("input[name='answer-text']").type("Answer 1");
    cy.get("#addAnswer").click();
    cy.get("input[name='answer-text']").type("Answer 2");
    cy.get("#addAnswer").click();
    cy.get("input[name='question-text']").type("Text of question");
    cy.get("#startPolling").click();
    cy.url().should("contain", "/home");
  });
});
