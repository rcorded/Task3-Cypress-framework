import { featureDemoPage, WIDGET_TABS } from '../../pages/telnyx/featureDemoPage';

describe('Feature Demo Widget - State Management', () => {

  it('TC-10: Local Context Preservation Upon Tab Switching', () => {
    const testMessage = 'My secret test message';
    featureDemoPage.visit();
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
});