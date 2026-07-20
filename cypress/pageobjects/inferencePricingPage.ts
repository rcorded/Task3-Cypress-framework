class InferencePricingPage {
  readonly PAGE_URL = '/pricing/inference-api';
  
  get currencyDropdown() { 
    return cy.get('button#currency-filter[role="combobox"]'); 
  }
  get mainContentArea() {
    return cy.get('#pay-as-you-go');
  }

  getActiveCurrency() {
    return this.currencyDropdown
      .invoke({ timeout: 10000 }, 'text')
      .should('not.be.empty') 
      .then((text) => text.trim()); 
  }
  selectCurrency(targetCurrency: string) {
    this.currencyDropdown.click();
    cy.get('[role="option"]').contains(targetCurrency).click();
    return this;
  }
  extractAllPrices() {
    return this.mainContentArea.invoke('text').then((rawText) => {
      const priceRegex = /([$€])\s*(\d+(?:\.\d+)?)/g;
      const matches = [...rawText.matchAll(priceRegex)];
      const parsedData = matches.map((match) => ({
        symbol: match[1],         
        price: parseFloat(match[2])
      }));
      return parsedData;
    });
  }
}

export const inferencePricingPage = new InferencePricingPage();