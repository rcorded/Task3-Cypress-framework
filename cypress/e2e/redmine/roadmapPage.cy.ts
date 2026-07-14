import { roadmapPage } from '../../pages/redmine/roadmapPage'; // Укажите правильный путь
import { ROADMAP_FILTER_TRACKERS } from '../../fixtures/constants';

describe('Module: Roadmap / Filters', () => {

  beforeEach(() => {
    roadmapPage.visit();
  });

  ROADMAP_FILTER_TRACKERS.forEach((tracker) => {
    it(`TC-03: Verify Issue Types Filtering Functionality on the Roadmap Page -> Uncheck "${tracker}"`, () => {
      ROADMAP_FILTER_TRACKERS.forEach((defaultTracker) => {
        roadmapPage.setTrackerFilterState(defaultTracker, 'check');
      });
      roadmapPage.clickApply();
      roadmapPage.setTrackerFilterState(tracker, 'uncheck');
      roadmapPage.clickApply();
      roadmapPage.relatedIssuesBlocks.should(($blocks) => {
        const text = $blocks.text();
        expect(text, `ERROR: Tasks with type "${tracker}" are still displayed in the list!`)
          .not.to.include(tracker);
      });
    });
  });
});