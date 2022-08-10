/// <reference types="Cypress" />
import Form from './Page Objects/Page Object.js';
// import Random from './Page Objects/Page Object.js';

//Set variables for test
const base_url = 'https://spelanky.github.io/spelanky2.github.io/';
const name = 'Mitka';
const email = 'mymail';
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
      // const random = new Random();

      it('Sent Sumbission', () => {
         cy.visit(`${base_url}`);
         cy.viewport(1600, 1200);
         cy.location('protocol').should('eq', 'https:');

         sent.Name().type(`${name}`);

         // sent.Email().type(`${email}`);
         sent.Email().type(`${email}_${Random()}@test.com`);
         sent.Message().type(`${message}`);

         // Attach file
         sent.Attachment().selectFile('file1.png');
         //Attach 3 files
         sent.Attachment2().selectFile(['file1.png', 'file2.png', 'file3.png']);

         //Date field
         sent.Birthday().type(`${birthday}`);
         //Radio button check
         cy.get('[type="radio"]').first().should('have.value', 'PHP').check();
         //Selector Favourite season
         sent.Season().select('Summer');
         //Range setting
         cy.get('input[type="range"]')
            .as('range')
            .invoke('val', 7)
            .trigger('change');
         //Checkbox check
         cy.get('[type="checkbox"]').check();
         //Submit Form
         sent.btnSubmit().should('be.visible');
      });
   });
});
