import { inferencePricingPage } from '../../pages/telnyx/inferencePricingPage';
import currencyData from '../../fixtures/currencyData.json';

describe('Dynamic Currency Conversion Validation Across All Tables', () => {
  
  beforeEach(() => {
    inferencePricingPage.visit();    
    inferencePricingPage.currencyDropdown.should('be.visible');
  });

  currencyData.forEach(({ id, scenario, targetCurrency, expectedSymbol, regexPattern }) => {
    it(`TC-9: ${id} - ${scenario}`, function () {      
        inferencePricingPage.getActiveCurrency().then((baseCurrency) => {
        
        cy.log(`${id} ` + baseCurrency);
        console.log(`${id} ` + baseCurrency);

        if (baseCurrency === targetCurrency) {
          cy.log(`[Skipped] The target currency (${targetCurrency}) is already active.`);
          this.skip();
        }

        inferencePricingPage.extractAllPrices().then((basePrices) => {
          expect(basePrices.length).to.be.greaterThan(0, 'Baseline prices extracted');
          inferencePricingPage.selectCurrency(targetCurrency);
          inferencePricingPage.mainContentArea.should('contain.text', expectedSymbol);
          inferencePricingPage.extractAllPrices().then((newPrices) => {            
            expect(newPrices.length).to.equal(basePrices.length, 'Pricing records count match');
            console.log(newPrices)
            newPrices.forEach((newItem, index) => {
              const baseItem = basePrices[index];

              expect(newItem.symbol).to.equal(
                expectedSymbol, 
                `Exact Symbol Match for record #${index}`
              );

              expect(newItem.symbol).to.not.equal(
                baseItem.symbol, 
                `No Residual Data (Base symbol removed) for record #${index}`
              );

              expect(newItem.price).to.not.equal(
                baseItem.price, 
                `Mass Value Recalculation triggered for record #${index}`
              );

              const regex = new RegExp(regexPattern);
              expect(newItem.price.toString()).to.match(
                regex, 
                `Format Validation for record #${index}`
              );
            });
          });
        });
      });  
    });
  });

});