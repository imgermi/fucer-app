describe("Lighthouse", function () {
  it("should pass the audits", function () {
    cy.visit("/");
    cy.lighthouse();
  });
});
