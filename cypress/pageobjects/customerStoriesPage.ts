class CustomerStoriesPage {
  readonly PAGE_URL = '/customer-stories';

  get industryDropdown() {
    return cy.contains('Industry').parent().find('[role="combobox"]').first();
  }
  get dropdownOptions() {
    return cy.get('[data-radix-popper-content-wrapper] [role="option"], [role="option"]');
  }
  get clearFiltersLink() {
    return cy.contains('Clear filters', { matchCase: false });
  }

  clickClearFilters() {
    this.clearFiltersLink.click();
    return this;
  }
  getCustomerStoryCards(options = {}) {
    return cy.get('a[href*="/customer-stories/"]', options);
  }
  getCardBadgeText(cardElement: HTMLElement | JQuery<HTMLElement>): string {
    return Cypress.$(cardElement).find('span.bg-black').text();
  }
  openIndustryDropdown() {
    this.industryDropdown.click();
    return this;
  }
  closeDropdown() {
    cy.get('body').type('{esc}');
    return this;
  }
  selectIndustryOption(option: string) {
    this.dropdownOptions
      .contains(option)
      .click();
    return this;
  }
  applyIndustryFilter(filterName: string) {
    this.openIndustryDropdown();
    this.selectIndustryOption(filterName);
    return this;
  }
  getTopIndustryFilters(skipCount: number = 0, takeCount: number = 3) {
    this.openIndustryDropdown();
    return this.dropdownOptions.then(($options) => {
      const filters = $options
        .toArray()
        .slice(skipCount, skipCount + takeCount)
        .map((el) => el.innerText.trim());      
      this.closeDropdown();      
      return cy.wrap(filters);
    });
  }
}

export const customerStoriesPage = new CustomerStoriesPage();