export const WIDGET_TABS = {
  INFERENCE: 'Inference',
  VOICE_AGENT: 'Voice Agent Builder',
} as const;

class FeatureDemoPage {
  get inferenceTab() { 
    return cy.get('button[role="tab"]').contains(WIDGET_TABS.INFERENCE);
  }

  get voiceAgentTab() { 
    return cy.get('button[role="tab"]').contains(WIDGET_TABS.VOICE_AGENT);
  }

  get modelCards() {
    return cy.contains('span', 'CHOOSE MODEL')
      .parent()
      .parent()
      .find('button[aria-pressed]');
  }

  get chatInput() { 
    return cy.get('[placeholder="Type message here"]'); 
  }

  visit() {
    cy.visit(Cypress.env('telnyx'));
    return this;
  }

  switchTab(tabName: typeof WIDGET_TABS[keyof typeof WIDGET_TABS]) {
    if (tabName === WIDGET_TABS.INFERENCE) {
      this.inferenceTab.click();
    } else if (tabName === WIDGET_TABS.VOICE_AGENT) {
      this.voiceAgentTab.click();
    }
    return this;
  }

  selectLastModel() {
    return this.modelCards.last()
      .click()
      .invoke('text')
      .then((rawText) => rawText.trim());
  }

  typeMessage(message: string) {
    this.chatInput.type(message);
    return this; 
  }
}

export const featureDemoPage = new FeatureDemoPage();