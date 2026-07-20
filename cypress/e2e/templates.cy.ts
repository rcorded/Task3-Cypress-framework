import { templatesPage } from '../pageobjects/templatesPage';

describe('Templates Catalog - Dynamic Filter Validation', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Illegal invocation')) {
        return false;
      }
    });
    cy.visit(templatesPage.PAGE_URL);
    templatesPage.getTemplateCards().should('have.length.greaterThan', 0);
  });

  it('TC-12: Verify dynamic industry category filters isolate matching templates', () => {
    templatesPage.getDynamicFilters().then((filtersToTest) => {
      cy.log(`Dynamic filters extracted for testing: ${filtersToTest.join(', ')}`);
      cy.wrap(filtersToTest).each((filterName: string) => {
        cy.log(`--- Testing dynamic filter: "${filterName}" ---`);
        cy.wait(1500);
        templatesPage.applyFilter(filterName);
        cy.log(`Waiting for the grid to dynamically update with "${filterName}" templates...`);
        templatesPage.getTemplateCards({ timeout: 10000 }).should(($cards) => {          
          expect($cards.length).to.be.greaterThan(0);
          for (let i = 0; i < $cards.length; i++) {
            const badgeText = templatesPage.getCardBadgeText($cards[i]);
            expect(
              badgeText.toLowerCase(), 
              `Expected card to have tag "${filterName}", but found "${badgeText}"`
            ).to.include(filterName.toLowerCase());
          }
        });
      });
    });
  });
});