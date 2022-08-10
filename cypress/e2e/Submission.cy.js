/// <reference types="Cypress" />
import Form from './Page Objects/Page Object.js';

//Set variables for test
const base_url = 'https://spelanky.github.io/spelanky2.github.io/';
const name = 'Mitka';
const email = 'mymail@test.com';
const message = 'Lorem Ipsum Message Text';
const birthday = '1985-04-04';

function Random() {
   let text = '';
   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   for (
      var i = 0;
      i < 1;
      i++ //How many chars
   )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   return text;
}

describe('Send submission', () => {
   context('Submission', () => {
      const sent = new Form();

      it('Sent', () => {
         cy.visit(`${base_url}`);
         cy.viewport(1600, 1200);
         cy.location('protocol').should('eq', 'https:');

         sent.Name().type(`${name}`);
         // sent.Email().type(`${email}`);

         sent.Email().type(`mail_${Random()} @test.com`);

         sent.Message().type(`${message}`);

         // Attach file
         sent.Attachment().selectFile('file1.png');

         //Attach 3 files
         sent.Attachment2().selectFile(['file1.png', 'file2.png', 'file3.png']);

         sent.Birthday().type(`${birthday}`);
         //Radio button
         cy.get('[type="radio"]').first().should('have.value', 'PHP').check();
         //Favorite season
         sent.Season().select('Summer');
         //Range
         cy.get('input[type="range"]')
            .as('range')
            .invoke('val', 7)
            .trigger('change');
         //Checkbox
         cy.get('[type="checkbox"]').check();
         //Submit Form
         sent.btnSubmit().should('be.visible');
      });
   });
});
