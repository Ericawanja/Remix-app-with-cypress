/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(()=>{
    cy.task('seedDatabase')
  })
  it('should display a list of fetched takeaways', () => {
    cy.visit('/')
  });
});