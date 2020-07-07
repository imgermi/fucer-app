/* eslint sonarjs/no-duplicate-string: 0 */

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
}

describe("Accesibilidad", function () {
  before(function () {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.injectAxe();
  });

  const paginasPublicas = [
    "/",
    "confirme-su-email",
    "ingrese-su-email",
    "login",
    "nueva-clave",
    "registro",
    "restaurar-clave",
    "seleccione-su-plan",
  ];
  paginasPublicas.map((pagina) => {
    context(`Página: "${pagina}"`, function () {
      it("No se detectan violaciones de accesibilidad al cargar", function () {
        cy.visit(pagina);
        cy.checkA11y(null, null, terminalLog);
      });
    });
  });

  const paginasPrivadas = [
    "offline",
    "medio-de-pago",
    "estado-suscripcion",
    "debito-automatico",
    "ayuda",
    "contenido-no-disponible",
    "buscar",
    "configuracion",
    "favoritas",
    "inicio",
    "modificar-datos",
    "normativa/8",
  ];
  paginasPrivadas.map((pagina) => {
    context(`Página: "${pagina}"`, function () {
      it("No se detectan violaciones de accesibilidad al cargar", function () {
        cy.login();
        cy.visit(pagina);
        cy.checkA11y(null, null, terminalLog);
      });
    });
  });
});
