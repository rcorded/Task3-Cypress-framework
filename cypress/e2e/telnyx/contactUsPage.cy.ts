import { contactUsPage } from '../../pages/telnyx/contactUsPage';
import invalidEmailData from '../../fixtures/invalidEmailData.json';
import invalidPhoneData from '../../fixtures/invalidPhoneData.json';

describe('Negative Frontend Validation of Form', () => {
  
  beforeEach(() => {
    contactUsPage.visit();
  });

  describe('Negative Frontend Validation of "Business email" Field', () => {
    invalidEmailData.forEach(({ id, testScenario, input }) => {    
      it(`TC-6: ${id} - ${testScenario}: Input "${input}"`, () => {
        contactUsPage.fillInvalidEmail(input);

        // Since the exact error message is unknown, the test checks whether an error message is present at all
        contactUsPage.emailErrorMessage.should('be.visible'); 
        contactUsPage.emailInput
          .should('have.attr', contactUsPage.INVALID_ATTR, 'true')
          .and('have.class', contactUsPage.INVALID_CLASS);
      });
    });
  });

  describe('Negative Frontend Validation of "Phone Number" Field', () => {
    invalidPhoneData.forEach(({ id, testScenario, input}) => {
      it(`TC-5: ${id} - ${testScenario}: Input "${input}"`, () => {
        contactUsPage.fillInvalidPhone(input);
        contactUsPage.phoneErrorMessage.should('be.visible');
        contactUsPage.phoneInput
          .should('have.attr', contactUsPage.INVALID_ATTR, 'true')
          .and('have.class', contactUsPage.INVALID_CLASS);
      });
    });
  });

});