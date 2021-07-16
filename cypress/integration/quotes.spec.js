// write tests here
describe("Quotes App", () => {
  // scheduele something to happen before each test
  // before each test we navigate to http://localhost:1234/
  // EACH TEST NEEDS FRESH STATE

  beforeEach(() => {
    cy.visit("http://localhost:1234/");
  });

  // Helpters to avoid tedious repetition
  const textInput = () => cy.get('input[name="text"]');
  const authorInput = () => cy.get('input[name="author"]');
  const submitButton = () => cy.get("button[id=submitBtn]");
  const cancelBtn = () => cy.get("#cancelBtn");
  const gagaBtn = () => cy.get('input[name="gaga"]');

  const editButton0 = () => cy.get('button[data-cy="editBtn0"]');
  const deleteButton0 = () => cy.get('button[data-cy="deleteBtn0"]');
  const editButton1 = () => cy.get('button[data-cy="editBtn1"]');
  const deleteButton1 = () => cy.get('button[data-cy="deleteBtn1"]');
  const editButton2 = () => cy.get('button[data-cy="editBtn2"]');
  const deleteButton2 = () => cy.get('button[data-cy="deleteBtn2"]');

  // use the 'it' keyword for tests
  it("sanity checks", () => {
    // assertion(s)
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    // primitive data types like integers use equal. But other data types like arrays and objects must use eql
    expect({}).to.eql({});
    expect({}).to.not.equal({});
  });

  it("the proper element exists", () => {
    // Sanity checking that the elements that should exist are there
    textInput().should("exist");
    authorInput().should("exist");
    submitButton().should("exist");
    cancelBtn().should("exist");
    gagaBtn().should("not.exist");

    editButton0().should("exist");
    deleteButton0().should("exist");
    editButton1().should("exist");
    deleteButton1().should("exist");
    editButton2().should("exist");
    deleteButton2().should("exist");
  });

  describe("Filling our inputs and cancelling", () => {
    it("submit button is disabled", () => {
      submitButton().should("be.disabled");
    });

    it("can type inside the inputs", () => {
      textInput().should("have.value", "").type("Be Nice to your CSS specialist!").should("have.value", "Be Nice to your CSS specialist!");

      authorInput().should("have.value", "").type("Shariq The Magnificent").should("have.value", "Shariq The Magnificent");
    });

    it("the submit button enables itself if we type on both inputs", () => {
      textInput().type("Shariq is so handsome and smart");
      authorInput().type("Shariq The Wise");
      submitButton().should("be.enabled");
    });

    it("the cancel button can reset inputs and disable button", () => {
      textInput().type("All who live adore in my smexiness");
      authorInput().type("Shariq The Smexy");
      cancelBtn().click();
      textInput().should("have.value", "");
      authorInput().should("have.value", "");
      submitButton().should("be.disabled");
    });
  });

  describe("Adding a new quote and deleting it", () => {
    it("can submit and delete", () => {
      // assert that an element with some text isn't there
      cy.contains(/have fun/i).should("not.exist");
      textInput().type("have fun");
      authorInput().type("Gabe");
      submitButton().click();
      cy.contains(/have fun/).should("exist");
      cy.contains(/have fun/)
        .next()
        .next()
        .click();
      cy.contains(/have fun/).should("not.exist");
    });
  });
});
