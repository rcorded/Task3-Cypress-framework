class TemplatesPage {
  readonly PAGE_URL = '/templates';

  get filterButtons() {
    return cy.contains('span.typography-cta', 'Filter by industry:')
             .parent()
             .find('button');
  }
  getTemplateCards(options = {}) {
    return cy.get('#templates a[href*="/templates/"]:visible', options);
  }
  applyFilter(filterName: string) {
    this.filterButtons.contains(filterName, { matchCase: false }).click();
    return this;
  }
  getDynamicFilters() {
    return this.filterButtons.then(($buttons) => {
      const filters = $buttons
        .toArray()
        .map((el) => el.innerText.trim())
        .slice(0, $buttons.length-1);
      return cy.wrap(filters);
    });
  }
  getCardBadgeText(cardElement: HTMLElement | JQuery<HTMLElement>): string {
    return Cypress.$(cardElement).find('strong.typography-heading2-category, strong.bg-citron').text();
  }
}

export const templatesPage = new TemplatesPage();