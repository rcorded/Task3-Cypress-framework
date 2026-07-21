import { customerStoriesPage } from '../pageobjects/customerStoriesPage';

describe('Customer Stories - Data-Driven Dropdown Filter Validation', () => {
  beforeEach(() => {
    // Ignore the "Illegal invocation" error thrown by the application's frontend script so Cypress doesn't fail the test.
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Illegal invocation')) {
        return false;
      }
    });    
    cy.visit(customerStoriesPage.PAGE_URL);
    customerStoriesPage.getCustomerStoryCards().should('have.length.greaterThan', 0); 
  });

  it('TC-13: Dynamically extract and verify the first 3 Industry filters', () => {    
    customerStoriesPage.getTopIndustryFilters(0, 3).then((filtersToTest) => {
      cy.log(`Dynamic filters extracted for testing: ${filtersToTest.join(', ')}`);
      cy.wrap(filtersToTest).each((filterName: string) => {
        cy.log(`--- Testing dynamic filter: "${filterName}" ---`);
        customerStoriesPage.applyIndustryFilter(filterName);
        cy.log(`Waiting for the grid to dynamically update with "${filterName}" cards...`);
        customerStoriesPage.getCustomerStoryCards({ timeout: 10000 }).should(($cards) => {          
          expect($cards.length).to.be.greaterThan(0);
          for (let i = 0; i < $cards.length; i++) {
            const badgeText = customerStoriesPage.getCardBadgeText($cards[i]);            
            expect(badgeText.toLowerCase()).to.include(filterName.toLowerCase());
          }
        });
      });
    });
  });

  it('TC-14: Verify "Clear filters" resets the grid to its default state', () => {
    customerStoriesPage.getTopIndustryFilters(0, 1).then((filters) => {
      const firstFilter = filters[0];
      cy.log(`Step 1: Applying the first filter: "${firstFilter}"`);
      customerStoriesPage.applyIndustryFilter(firstFilter);
      customerStoriesPage.getCustomerStoryCards({ timeout: 10000 }).should(($cards) => {
        expect($cards.length).to.be.greaterThan(0);
        const badgeText = customerStoriesPage.getCardBadgeText($cards[0]);
        expect(badgeText.toLowerCase()).to.include(firstFilter.toLowerCase());
      }).then(($cards) => {
        cy.wrap($cards.length).as('filteredCount');
        cy.log(`Count of cards with filter applied: ${$cards.length}`);
      });
      customerStoriesPage.clearFiltersLink.should('be.visible');
      cy.log('Step 2: Clicking the "Clear filters" link');
      customerStoriesPage.clickClearFilters();
      cy.get('@filteredCount').then((filteredCount) => {
        customerStoriesPage.getCustomerStoryCards({ timeout: 10000 })
          .should('have.length.at.least', filteredCount);
      });
      customerStoriesPage.industryDropdown.should('contain.text', 'All industries');
      customerStoriesPage.clearFiltersLink.should('not.exist');
    });
  });
});