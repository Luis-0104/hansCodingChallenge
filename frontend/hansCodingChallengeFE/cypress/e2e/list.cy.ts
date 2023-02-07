describe("Display the list", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });
  it("loads page", () => {
    cy.get("#root").should("exist");
 
    
  });
  
  it("search for User", () => {
    cy.get('#\\:r4\\:').type('Rentner');
    cy.get('.MuiToolbar-root').should("contain.text","1 of 1")
  });

  
});
