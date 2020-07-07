/* eslint sonarjs/no-duplicate-string: 0 */
describe("Inicio de sesión", function () {
  before(function () {
    cy.viewport("iphone-x");
  });

  beforeEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  context("Acceso sin sesión iniciada", function () {
    it("es redirigido al login cuando no se inició sesión", function () {
      cy.visit("/inicio");
      cy.url().should("include", "/login");
    });
  });

  context("Envío de formulario HTML", function () {
    beforeEach(function () {
      cy.visit("/login");
    });

    it("muestra errores en el login", function () {
      cy.get("[data-cy=submit]").click();

      cy.get("[data-cy=error-email]").should("be.visible");
      cy.get("[data-cy=error-password]").should("be.visible");

      cy.url().should("include", "/login");
    });

    it("valida contraseña", function () {
      cy.get("[data-cy=email]").type(Cypress.env("testUser").email);
      cy.get("[data-cy=password]").type("Contraseñ4Inv4lida");
      cy.get("[data-cy=submit]").click();

      cy.get("[data-cy=error-form]").should("be.visible");

      cy.url().should("include", "/login");
    });

    it("redirige al inicio cuando se inicia sesión", function () {
      cy.get("[data-cy=email]").type(Cypress.env("testUser").email);
      cy.get("[data-cy=password]").type(Cypress.env("testUser").password);
      cy.get("[data-cy=submit]").click();

      cy.url().should("include", "/inicio");
    });
  });

  context("Acceso con sesión iniciada", function () {
    beforeEach(function () {
      cy.login();
    });

    it("permite acceder a páginas restringidas una vez loggeado", function () {
      cy.visit("/inicio");
      cy.url().should("include", "/inicio");
    });
  });
});
