import { issuesPage } from '../../pages/redmine/issuesPage';
import { searchPage } from '../../pages/redmine/searchPage';

describe('Module: Global Search', () => {

  beforeEach(() => {
    // Ignore the "Illegal invocation" error thrown by the application's frontend script so Cypress doesn't fail the test.
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Illegal invocation')) {
        return false;
      }
    });

    issuesPage.visit();
  });

  it('TC-05: Search for an existing issue using dynamic data reading', () => {
    issuesPage.getFirstIssueTitle().then((savedIssueTitle) => {
      expect(savedIssueTitle.length, 'ERROR: Failed to read the issue title (string is empty)')
        .to.be.greaterThan(0);
      searchPage.fillGlobalSearch(savedIssueTitle);
      searchPage.globalSearchInput.should('have.value', savedIssueTitle);
      searchPage.pressEnterInGlobalSearch();
      cy.url().should('match', searchPage.PAGE_URL_REGEX);
      searchPage.resultItems.should(($items) => {
        expect($items.length, 'ERROR: Search results list is empty').to.be.greaterThan(0);
        const resultTitles = $items.toArray().map(el => el.innerText.toLowerCase());
        const isTextFound = resultTitles.some(title =>
          title.includes(savedIssueTitle.toLowerCase())
        );
        expect(isTextFound, `ERROR: No search result contains the searched text: "${savedIssueTitle}"`)
          .to.be.true;
      });
    });
  });

});