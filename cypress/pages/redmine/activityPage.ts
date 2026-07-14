class ActivityPage {
  get applyBtn() { return cy.get('.sidebar input[type="submit"], input[value="Apply"]'); }
  get periodSubtitle() { return cy.get('#content > p').first(); }
  get dateGroupHeaders() { return cy.get('#content h3'); }
  get dateInput() { return cy.get('input#from'); }

  visit() {
    cy.visit(Cypress.env('activityPage'));
    return this;
  }

  selectUpToDate(dateStr: string) {
    this.dateInput.click().clear().type(dateStr);
  }

  clickApply() {
    this.applyBtn.click();
  }

  getPeriodSubtitle() {
    return this.periodSubtitle.invoke('text').then((text) => text.trim());
  }

  getDateHeaders() {
    return this.dateGroupHeaders.then(($els) => {
      return Cypress._.map($els, (el) => el.innerText.trim());
    });
  }
}

export const activityPage = new ActivityPage();