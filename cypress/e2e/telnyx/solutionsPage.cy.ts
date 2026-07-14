import { solutionsPage } from '../../pages/telnyx/solutionsPage';

describe('Frontend Search Validation on the Solutions page', () => {
  
  beforeEach(() => {
    solutionsPage.visit();
    solutionsPage.useCaseCardTitles.should('have.length.greaterThan', 0);
  });

  it('TC-8: Verify successful search of a use case card by exact title', () => {    
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
});