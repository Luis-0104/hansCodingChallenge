describe("Test EditPerson", () => {
  before(() => {
    cy.request({
      method: "DELETE",
      url: "http://localhost:3000/api/customers/12345",
      body: {
        "Content-type": "application/json; charset=UTF-8",
      },
      failOnStatusCode: false,
    });
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/customers",
      body: {
        id: 12345,
        user_name: "BrotBernd123",
        first_name: "Bernd",
        last_name: "DasBrot",
        birth_date: "2003-08-01T00:00:00.000Z",
        email: "Bernd@brot.de",
        password: "IchMag2Brot!",
        last_login: "2023-02-07T09:59:06.564Z",
      },
      failOnStatusCode: false,
    });
  });
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get("#\\:r4\\:").clear();
    cy.get("#\\:r4\\:").type("12345");
    cy.get("#Edit12345Button").click();
  });

 

  it("generate new number", () => {
    cy.get("#CustomerNumberInputField")
      .invoke("val")
      .then((val) => {
        cy.get('[data-testid="AutorenewOutlinedIcon"]').click();
        cy.get("#CustomerNumberInputField").should("not.have.value", val);
      });
  });

  it("Allows valid input", () => {
    validInput();

    // This doesn't actually add the user it just checks the validation
    cy.get("#EditPersonSubmitButton").should("not.be.disabled");
  });

  it("displays every invalid Input", () => {
    cy.get("#CustomerNumberInputField").clear();
    cy.get("#CustomerNumberInputField").type("5").blur();
    cy.get("#CustomerNumberInputField-helper-text").should("exist");

    cy.get("#FirstNameInputField").clear();
    cy.get("#FirstNameInputField").type("s").blur();
    cy.get("#FirstNameInputField-helper-text").should("exist");

    cy.get("#LastNameInputField").clear();
    cy.get("#LastNameInputField").type("u").blur();
    cy.get("#UserNameInputField").type("!!fdgd7").blur();
    cy.get("#UserNameInputField-helper-text").should("exist");

    cy.get("#EmailInputField").clear();
    cy.get("#EmailInputField").type("keineMail@adresse").blur();
    cy.get("#EmailInputField-helper-text").should("exist");

    cy.get("#BirthdayInputField").clear();
    cy.get("#BirthdayInputField").type("1005-01-01").blur();
    cy.get("#BirthdayInputField-helper-text").should("exist");

    cy.get("#PasswordInputField").clear();
    cy.get("#PasswordInputField").type("hallo").blur();
    cy.get("#PasswordInputField-helper-text").should("exist");

    cy.get("#RepeatPasswordInputField").clear();
    cy.get("#RepeatPasswordInputField").type("servus").blur();
    cy.get("#RepeatPasswordInputField-helper-text").should("exist");
  });

  it("don't allow used customerNumber", () => {
    cy.get("#CustomerNumberInputField").clear();
    cy.get("#CustomerNumberInputField").type("31167");
    cy.get("#CustomerNumberInputField").blur();
    cy.get("#CustomerNumberInputField-helper-text").should("exist");
  });

  it("don't allow used userName", () => {
    cy.get("#UserNameInputField").clear();
    cy.get("#UserNameInputField").type("rentner");
    cy.get("#UserNameInputField").blur();
    cy.get("#UserNameInputField-helper-text").should("exist");
  });

  it("edit the User", () => {
    validInput();
    cy.get("#EditPersonSubmitButton").click();
    cy.get("#successInfoAlert").should("exist");

    cy.get(".MuiAlert-action > .MuiButtonBase-root").click();
    cy.get("#successInfoAlert").should("not.exist");

    cy.get("#\\:r4\\:").clear();
    cy.get("#\\:r4\\:").type("12345");

    cy.get('[data-field="last_name"] > .MuiDataGrid-cellContent').should(
      "contain.text",
      "DasBaguette"
    );
  });

  after(() => {
    cy.visit("/");
  });
});

function validInput() {
  cy.get("#CustomerNumberInputField").clear();
  cy.get("#CustomerNumberInputField").type("12345");
  cy.get("#FirstNameInputField").clear();
  cy.get("#FirstNameInputField").type("Bernd");
  cy.get("#LastNameInputField").clear();
  cy.get("#LastNameInputField").type("DasBaguette");
  cy.get("#UserNameInputField").clear();
  cy.get("#UserNameInputField").type("BrotBernd123");
  cy.get("#EmailInputField").clear();
  cy.get("#EmailInputField").type("Bernd@brot.de");
  cy.get("#BirthdayInputField").clear();
  cy.get("#BirthdayInputField").type("2003-08-01");
  cy.get("#PasswordInputField").clear();
  cy.get("#PasswordInputField").type("IchMag2Brot!");
  cy.get("#RepeatPasswordInputField").clear();
  cy.get("#RepeatPasswordInputField").type("IchMag2Brot!");
  cy.get("#RepeatPasswordInputField").blur();
}
