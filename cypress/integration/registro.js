describe("Registro", function () {
  before(function () {
    cy.viewport("iphone-x");
  });

  beforeEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  context("Paso #1", function () {
    it("muestra mensaje de error si el usuario ya existe", function () {
      cy.visit("/registro");
      cy.get("[data-cy=nombre]").type(Cypress.env("testUser").nombre);
      cy.get("[data-cy=email]").type(Cypress.env("testUser").email);
      cy.get("[data-cy=password]").type(Cypress.env("testUser").password);
      cy.get("[data-cy=password-repeat]").type(
        Cypress.env("testUser").password
      );
      cy.get("form").submit();

      cy.get("[data-cy=error-form]").as("mensaje");
      cy.get("@mensaje").should("be.visible");
    });
  });

  context("Registro de usuario existente", function () {
    it("registra el usuaio", function () {
      cy.visit("/registro");
      cy.get("[data-cy=nombre]").type(Cypress.env("testUser").nombre);
      cy.get("[data-cy=email]").type(
        `andresdameson+fucer-test-${new Date().getTime()}@gmail.com`
      );
      cy.get("[data-cy=password]").type(Cypress.env("testUser").password);
      cy.get("[data-cy=password-repeat]").type(
        Cypress.env("testUser").password
      );
      cy.get("form").submit();

      cy.url().should("include", "/confirme-su-email");
    });
  });
});
