import { faker } from '@faker-js/faker';
import { signUpPage } from '../pageobjects/signUpPage';
import passwordValidationTests from '../fixtures/passwordValidation.json';

describe('Registration / Sign-Up Validation', () => {
  beforeEach(() => {
    // Ignore the "Illegal invocation" error thrown by the application's frontend script so Cypress doesn't fail the test
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Illegal invocation')) {
        return false;
      }
    });
    cy.visit(signUpPage.PAGE_URL);
  });

  it('TC-8: Negative Sign-Up: Empty mandatory fields and unaccepted terms validation', () => {    
    cy.log('Click the SIGNUP button with empty fields');
    signUpPage.clickSignUp();
    cy.location('pathname').should('eq', signUpPage.PAGE_URL);
    cy.log('Verify Email field turns red and shows error');
    signUpPage.emailInput.should('have.attr', 'aria-invalid', 'true');  
    signUpPage.emailError.should('be.visible'); 
    cy.log('Verify Password field turns red and shows error');
    signUpPage.passwordInput.should('have.attr', 'aria-invalid', 'true'); 
    signUpPage.passwordError.should('be.visible')
    cy.log('Verify Terms checkbox shows error');
    signUpPage.termsCheckbox.should('have.attr', 'aria-invalid', 'true'); 
    signUpPage.termsError.should('be.visible');
  });

  passwordValidationTests.forEach((data) => {    
    it(`${data.tcId}: Negative Sign-Up: ${data.description}`, () => {
      const randomEmail = faker.internet.email();
      cy.log(`Step: Fill email (${randomEmail}), accept terms, enter password: ${data.testPassword}`);
      signUpPage.typeEmail(randomEmail);
      signUpPage.acceptTerms();
      signUpPage.typePassword(data.testPassword);
      cy.log('Step: Click SIGNUP');
      signUpPage.clickSignUp();
      cy.location('pathname').should('eq', '/sign-up');
      cy.log(`Expected Result: Error message contains is visible`);
      signUpPage.passwordInput.should('have.attr', 'aria-invalid', 'true');
      signUpPage.passwordError.should('be.visible')
    });
  });
});