import { featureDemoPage, WIDGET_TABS } from '../pageobjects/featureDemoPage';

describe('Feature Demo Widget - State Management', () => {
  beforeEach(() => {
    cy.visit(featureDemoPage.PAGE_URL);
    cy.wait(1000);
  });

  it('TC-5: Local Context Preservation Upon Tab Switching', () => {
    const testMessage = 'My secret test message';
    featureDemoPage.chatInput.should('have.value', '');
    featureDemoPage.selectLastModel().then((lastModelText) => {  
        featureDemoPage.typeMessage(testMessage);      
        featureDemoPage.switchTab(WIDGET_TABS.VOICE_AGENT);
        featureDemoPage.chatInput.should('not.exist');
        featureDemoPage.switchTab(WIDGET_TABS.INFERENCE);
        featureDemoPage.modelCards
          .contains(lastModelText)
          .closest('button') 
          .should('have.attr', 'aria-pressed', 'true');
        featureDemoPage.chatInput.should('have.value', testMessage);
      });
  });

  it('TC-6: Verify the system prevents sending an empty message', () => {
    featureDemoPage.selectLastModel();
    cy.log('Step 1: Click the SEND MESSAGE button with an empty input');
    featureDemoPage.chatInput.should('have.value', '');
    featureDemoPage.clickSendMessage();
    cy.log('Expected Result 1: Error message is visible and request is blocked');
    featureDemoPage.errorMessage.should('be.visible');
    cy.log('Step 2: Enter whitespace and click the SEND MESSAGE button again');
    featureDemoPage.typeMessage('     ');
    featureDemoPage.clickSendMessage();
    cy.log('Expected Result 2: Error message is visible for whitespace only');
    featureDemoPage.errorMessage.should('be.visible');
    featureDemoPage.chatInput.should('have.value', '     ');
  });

  it('TC-7: Verify selecting different AI models updates the active highlight state', () => {
    cy.log('Step 1: Observe the default selected model');
    featureDemoPage.modelCards.filter('[aria-pressed="true"]').should('have.length', 1);
    cy.log('Step 2: Click on each option in the list and verify states');
    featureDemoPage.modelCards.each(($button, index, $list) => {
      const totalModels = $list.length; 
      cy.wrap($button).click();
      cy.log(`Expected Result 1: Model at index ${index} receives active state`);
      cy.wrap($button).should('have.attr', 'aria-pressed', 'true');
      cy.log('Expected Result 2 & 3: Only one model is visually active, others revert to unhighlighted');
      featureDemoPage.modelCards.filter('[aria-pressed="true"]').should('have.length', 1);
      featureDemoPage.modelCards.filter('[aria-pressed="false"]').should('have.length', totalModels - 1);
    });
  });
});