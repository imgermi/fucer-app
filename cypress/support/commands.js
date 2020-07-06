Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}auth/login`,
    body: {
      username: Cypress.env('testUser').email,
      password: Cypress.env('testUser').password
    },
  })
  .its('body')
  .then((body) => {
    cy.window().then((window) => {
      window.localStorage.setItem('auth._token.local', 'Bearer '+body.token)
    })
  })
})