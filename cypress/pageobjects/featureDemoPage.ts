export const WIDGET_TABS = {
  INFERENCE: 'Inference',
  VOICE_AGENT: 'Voice Agent Builder',
} as const;

class FeatureDemoPage {
  readonly PAGE_URL = '/';

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
  get sendMessageButton() {
    return cy.contains('button', 'SEND MESSAGE');
  }
  get errorMessage() {
    return cy.contains('span', 'Please enter a message', { matchCase: false });
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
  clickSendMessage() {
    this.sendMessageButton.click({ force: true });
    return this;
  }
}

export const featureDemoPage = new FeatureDemoPage();