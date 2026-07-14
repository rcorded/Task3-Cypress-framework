class ContactUsPage {
  readonly INVALID_ATTR = 'aria-invalid';
  readonly INVALID_CLASS = 'mktoInvalid';

  get emailInput() { return cy.get('#Email, input[type="email"]'); }
  get emailErrorMessage() { return cy.get('#ValidMsgEmail'); }

  get phoneInput() { 
    return cy.get('#Phone_Number_Base__c, input[name="Phone_Number_Base__c"]'); 
  }  
  get phoneErrorMessage() { 
    return cy.get('#ValidMsgPhone_Number_Base__c, div[role="alert"][id*="Phone_Number"]'); 
  }

  visit() {
    cy.visit(Cypress.env('contactUsPage'));
    return this;
  }

  fillInvalidEmail(email: string) {
    this.emailInput.focus();
    if (email){
      this.emailInput.type(email);
    }
    this.emailInput.blur();
    this.emailInput.focus();
    return this;
  }

  fillInvalidPhone(phone: string) {
    this.phoneInput.focus();
    if (phone) {
      this.phoneInput.type(phone);
    }
    this.phoneInput.blur();
    this.phoneInput.focus();
    return this;
  }
}

export const contactUsPage = new ContactUsPage();