describe("Test different complex scenarios", () => {
  it("register -> login -> go to vote on question 1", () => {
    cy.visit("/register");
    cy.get("input[name='login']").type("newUser");
    cy.get("input[name='password']").type("pass");
    cy.get("input[name='date']").type("1999-09-09");
    cy.get("button").contains("Register").click();

    cy.get('input[name="login"]').type("newUser");
    cy.get('input[name="password"]').type("pass");
    cy.get("button").contains("Login").click();

    cy.get("nav > a").contains("Home").click();
    cy.get("a[href='/questions/1']").click();

    cy.get(".list-group")
      .contains("Denys Yermolenko")
      .find("input[type=radio]")
      .click();
    cy.get("#vote-button").click();
    cy.get(".list-group").contains("1 | Denys").should("exist");
  });
  it("register -> login -> logout", () => {
    cy.visit("/register");
    cy.get("input[name='login']").type("newUser");
    cy.get("input[name='password']").type("pass");
    cy.get("input[name='date']").type("1999-09-09");
    cy.get("button").contains("Register").click();

    cy.get('input[name="login"]').type("newUser");
    cy.get('input[name="password"]').type("pass");
    cy.get("button").contains("Login").click();
    cy.get("nav > a").contains("Logout").click();
    cy.url().should("contain", "/login");
  });
  it("login as admin -> create new question -> delete this question", () => {
    cy.get('input[name="login"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get("button").contains("Login").click();
    cy.get("nav > a").contains("Home").click();
    cy.contains("button", "Create new polling").click();

    cy.get("input[name='answer-text']").type("Answer 1");
    cy.get("#addAnswer").click();
    cy.get("input[name='answer-text']").type("Answer 2");
    cy.get("#addAnswer").click();
    cy.get("input[name='question-text']").type("Text of question");
    cy.get("#startPolling").click();

    cy.get("a[href*='/questions/']").eq(0).click();
    cy.get("#deletePolling").click();
    cy.url().should("contain", "/home");
  });
});
