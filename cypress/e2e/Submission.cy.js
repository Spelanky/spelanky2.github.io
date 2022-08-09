/// <reference types="Cypress" />
import Form from './Page Objects/Page Object.js';

//Set variables for test
const base_url = 'https://spelanky.github.io/spelanky2.github.io/';
const name = 'Mitka';
const email = 'mymail@test.com';
const message = 'Lorem Ipsum Message Text';
const birthday = '04.04.1985';

describe('Send submission', () => {
   context('Submission', () => {
      const sent = new Form();
      it('Sent', () => {
         cy.visit(`${base_url}`);
         cy.viewport(1600, 1200);
         cy.location('protocol').should('eq', 'https:');

         sent.Name().type(`${name}`);
         sent.Email().type(`${email}`);
         sent.Message().type(`${message}`);

         // Attach a file:
         // Attach multiple files:
         sent.Birthday().type(`${birthday}`);

         sent.btnSubmit().should('be.visible');
      });
   });
});
