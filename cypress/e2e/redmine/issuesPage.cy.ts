import { issuesPage } from '../../pages/redmine/issuesPage';
import { ISSUE_FILTER_STATUSES, ISSUES_TABLE_COLUMNS } from '../../fixtures/constants';

describe('Module: Issues', () => {
  
  beforeEach(() => {
    issuesPage.visit();
  });

  describe('Issues / Filters', () => {
    ISSUE_FILTER_STATUSES.forEach((status) => {
      it(`TC-02: Verify Issue Filtering by "Status" (operator: "is") on the Issue Page -> ${status}`, () => {        
        issuesPage.expandFilters();
        issuesPage.setStatusFilter('is', status);
        issuesPage.clickApply();
        issuesPage.getVisibleStatuses().then((displayedStatuses) => {
          if (displayedStatuses.length === 0) {
             cy.log(`No issues found with status: ${status}`);
          } else {
             displayedStatuses.forEach((displayedStatus, i) => {
               expect(displayedStatus).to.eq(status, `ERROR: Row ${i + 1} has incorrect status`);
             });
          }
        });
        issuesPage.clickClear();
      });
    });
  });

  describe('Issues / Options', () => {
    it('TC-01: Verify the display of selected columns in the issues table on the Issue Page', () => {      
      issuesPage.expandOptions();
      issuesPage.setColumns(ISSUES_TABLE_COLUMNS);
      issuesPage.clickApply();
      issuesPage.getTableHeadersTexts().then((actualHeaders) => {
        expect(actualHeaders[0], 'ERROR: The first column should be "#" (Task ID)')
          .to.eq('#');
        const actualUserColumns = actualHeaders.slice(1);        
        expect(actualUserColumns, 'ERROR: Displayed columns do not match the selected configuration')
          .to.deep.eq(ISSUES_TABLE_COLUMNS);
      });
    });
  });
});