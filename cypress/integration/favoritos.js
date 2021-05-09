describe("Búsqueda", function () {
  before(function () {
    cy.viewport("iphone-x");
  });

  beforeEach(function () {
    cy.login();
  });

  it("muestra mensaje de error si el usuario ya existe", function () {
    cy.visit("/buscar");
    cy.get("[data-cy=buscar]").type("2020{enter}");

    cy.get("[data-cy=normativa] > [data-cy=ver]").as("mensaje");
    cy.get("@mensaje").should("be.visible");
  });
});
