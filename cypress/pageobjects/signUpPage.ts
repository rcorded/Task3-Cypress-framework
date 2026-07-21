class SignUpPage {
  readonly PAGE_URL = '/sign-up';
  
  get emailInput() {
    return cy.get('#sign-up-email:visible, input[type="email"]:visible'); 
  }
  get passwordInput() {
    return cy.get('#sign-up-password, input[type="password"]');
  }
  get termsCheckbox() {
    return cy.get('#sign-up-terms');
  }
  get emailError() {
    return cy.get('#sign-up-email_message');
  }
  get passwordError() {
    return cy.get('#sign-up-password_message');
  }
  get termsError() {
    return cy.get('#sign-up-terms_message');
  }
  get signUpButton() {
    return cy.contains('button', 'SIGNUP', { matchCase: false });
  }

  typeEmail(email: string) {
    this.emailInput.clear().type(email);
    return this;
  }
  typePassword(password: string) {
    this.passwordInput.clear().type(password);
    return this;
  }
  acceptTerms() {
    this.termsCheckbox.check({ force: true });
    return this;
  }
  clickSignUp() {
    this.signUpButton.click();
    return this;
  }
}

export const signUpPage = new SignUpPage();