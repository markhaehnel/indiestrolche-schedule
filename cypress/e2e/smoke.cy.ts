describe("smoke tests", () => {
  it("should show page content", () => {
    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /log in/i });
  });
});
