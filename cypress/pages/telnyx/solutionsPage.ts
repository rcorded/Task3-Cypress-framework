class SolutionsPage {
  get searchInput() { 
    return cy.get('#search, input[type="search"]'); 
  }
  get useCaseCardTitles() { 
    return cy.get('#use-cases h3.base-heading'); 
  }

  visit() {
    cy.visit(Cypress.env('solutionsPage'));
    return this;
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
}

export const solutionsPage = new SolutionsPage();