class SolutionsPage {
  readonly PAGE_URL = '/solutions';

  get searchInput() { 
    return cy.get('#search, input[type="search"]'); 
  }
  get useCaseCardTitles() { 
    return cy.get('#use-cases h3.base-heading'); 
  }
  get noResultsMessage() {
    return cy.contains('No results for this filter');
  }

  performSearch(query: string) {
    this.searchInput.clear().type(`${query}{enter}`);
    return this;
  }
  getFirstCardTitle() {
    return this.useCaseCardTitles
      .first()
      .invoke('text')
      .then((text) => text.trim()); 
  }
  generateRandomInvalidString(){
    const randomString = Math.random().toString(36).substring(2, 10);
    const invalidQuery = `invalid_${randomString}`;
    return invalidQuery;
  }
}

export const solutionsPage = new SolutionsPage();