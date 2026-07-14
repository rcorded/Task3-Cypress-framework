class RoadmapPage {
  get applyBtn() {
    return cy.get('input[value="Apply"]').first();
  }

  get relatedIssuesBlocks() {
    return cy.get('.related-issues');
  }

  getTrackerCheckbox(trackerName: string) {
    return cy.contains('label', trackerName).find('input[type="checkbox"]');
  }

  visit() {
    cy.visit(Cypress.env('roadmapPage'));
    return this;
  }

  setTrackerFilterState(trackerName: string, state: 'check' | 'uncheck') {
    const checkbox = this.getTrackerCheckbox(trackerName);
    if (state === 'check') {
      checkbox.check();
    } else {
      checkbox.uncheck();
    }
  }

  clickApply() {
    this.applyBtn.click();
  }

}

export const roadmapPage = new RoadmapPage();