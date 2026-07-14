import { activityPage } from '../../pages/redmine/activityPage';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

describe('Module: Activity / Filters', () => {
  beforeEach(() => {
    activityPage.visit();
  });

  it('TC-04: Filter activity feed by a specific "up to" date on the Activity page', () => {
    const today = new Date();
    const targetDate = formatDate(new Date(today.setDate(today.getDate() - 1)));
    const middleDate = formatDate(new Date(today.setDate(today.getDate() - 1)));
    const startDate = formatDate(new Date(today.setDate(today.getDate() - 1)));

    const expectedPeriodText = `From ${startDate} to ${targetDate}`;
    const allowedDatesInFeed = [targetDate, middleDate, startDate, 'Today', 'Yesterday'];

    activityPage.selectUpToDate(targetDate);
    activityPage.dateInput.should('have.value', targetDate);
    activityPage.clickApply();

    activityPage.getPeriodSubtitle().then((text) => {
      expect(text).to.contain(expectedPeriodText);
    });

    activityPage.getDateHeaders().then((headers) => {
      if (headers.length > 0) {
        headers.forEach((headerDate) => {
          expect(allowedDatesInFeed, `Found date outside window: ${headerDate}`)
            .to.include(headerDate);
        });
      } else {
        cy.log('No activities found, skipping header validation.');
      }
    });
  });
});