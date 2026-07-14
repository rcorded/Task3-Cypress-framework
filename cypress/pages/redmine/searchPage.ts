class SearchPage {
  readonly PAGE_URL_REGEX = /.*\/search/;

  get searchResultsContainer() {
    return cy.get('#search-results');
  }

  get globalSearchInput() {
    return cy.get('input#q');
  }

  get resultItems() {
    return this.searchResultsContainer.find('dt');
  }

  fillGlobalSearch(query: string) {
    this.globalSearchInput.clear().type(query);
  }

  pressEnterInGlobalSearch() {
    this.globalSearchInput.type('{enter}');
  }
}

export const searchPage = new SearchPage();