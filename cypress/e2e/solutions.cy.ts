import { solutionsPage } from '../pageobjects/solutionsPage';

describe('Frontend Search Validation on the Solutions page', () => {
  beforeEach(() => {
    // Ignore the "Illegal invocation" error thrown by the application's frontend script so Cypress doesn't fail the test.
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Illegal invocation')) {
        return false;
      }
    });
    cy.visit(solutionsPage.PAGE_URL);
    solutionsPage.useCaseCardTitles.should('have.length.greaterThan', 0);
  });

  it('TC-3: Verify successful search of a use case card by exact title', () => {    
    solutionsPage.getFirstCardTitle().then((extractedTitle) => {
      cy.log(`Executing search with: "${extractedTitle}"`);
      solutionsPage.performSearch(extractedTitle);
      cy.wait(1000); 
      solutionsPage.useCaseCardTitles
        .should('be.visible')
        .and('have.length.at.least', 1);
      solutionsPage.useCaseCardTitles
        .first()
        .should('contain.text', extractedTitle);
    });    
  });

  it('TC-15: Verify "No results" message for invalid search query', () => {
    const invalidQuery = solutionsPage.generateRandomInvalidString();
    cy.log(`Executing search with invalid query: "${invalidQuery}"`);
    solutionsPage.performSearch(invalidQuery);    
    cy.wait(1000); 
    solutionsPage.useCaseCardTitles.should('not.exist');
    solutionsPage.noResultsMessage.should('be.visible');
  });
});