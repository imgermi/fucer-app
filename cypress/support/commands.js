/* eslint promise/catch-or-return: 0 */
/* eslint promise/always-return: 0 */
Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}auth/login`,
    body: {
      username: Cypress.env("testUser").email,
      password: Cypress.env("testUser").password,
    },
  })
    .its("body")
    .then((body) => {
      window.localStorage.setItem("auth._token.local", "Bearer " + body.token);
    });
});

import "cypress-audit/commands";
