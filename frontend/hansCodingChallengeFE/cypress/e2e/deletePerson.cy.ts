describe("Test DeletePerson", () => {
  before(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/customers",
      body: {
        id: 12345,
        user_name: "BrotBernd123",
        first_name: "Bernd",
        last_name: "DasBrot",
        birth_date: "2003-08-01 00:00:00",
        email: "Bernd@brot.de",
        password: "IchMag2Brot!",
        last_login: "2023-02-07 09:59:06",
      },
      failOnStatusCode: false,
    });
  });
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });
  it("loads page", () => {
    cy.get("#root").should("exist");
  });

  it("can cancel deletion", () => {
    cy.get("#\\:r4\\:").type("12345");

    cy.get("#Delete12345Button").click();
    cy.get(".MuiDialogActions-root > :nth-child(2)").click({force:true});
    cy.get(".MuiToolbar-root").should("contain.text", "1 of 1");

    cy.get("#Delete12345Button").click();
    cy.get(".MuiDialog-container").click({force:true});
    cy.get(".MuiToolbar-root").should("contain.text", "1 of 1");

    cy.get("#Delete12345Button").click();
    cy.get(".MuiDialog-container").type("{esc}");
    cy.get(".MuiToolbar-root").should("contain.text", "1 of 1");
  });
  
  it("deletes the user", () => {
    cy.get("#\\:r4\\:").type("12345");
    
    cy.get("#Delete12345Button").click();
    cy.get('.MuiDialogActions-root > :nth-child(1)').click({force:true});
    cy.get("#successInfoAlert").should("exist");
    cy.wait(500)
    cy.get(".MuiAlert-action > .MuiButtonBase-root").click();
    cy.get("#successInfoAlert").should("not.exist");
    cy.get(".MuiToolbar-root").should("contain.text", "0 of 0");
  
  });
});
