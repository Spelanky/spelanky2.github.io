/// <reference types="Cypress" />
import Login from './Page object/logi';
import Dashboard from './Page object/dash';

//Set variables for test
// const base_url = 'https://stiftungen.stiftungschweiz.ch/login';
// const email = 'dmytro+1@freihandlabor.com';
const base_url = 'https://stiftungen.stiftungschweiz.ch/login';
const email = 'stg_project_owner@test.com';
const password = 'Pa$$w0rd!';
//

describe('SCH', () => {
   context('Login to SCH', () => {
      const login = new Login();
      it('Login to SCH', () => {
         cy.visit(`${base_url}`);
         cy.viewport(1600, 1200);
         cy.location('protocol').should('eq', 'https:');

         // cy.get('button[type="button"][role="button"]');
         cy.get('#login-link');

         login
            .Email()
            .type(`${email}`)
            .should('have.value', `${email}`)
            .and('be.visible');
         login
            .Password()
            .type(`${password}`)
            .should('have.value', `${password}`)
            .and('be.visible');
         login
            .SubmitBtn()
            .should('not.have.class', 'btn btn-primary disabled')
            .and('be.visible');
         // login.SubmitBtn().should('have.text', 'Anmelden').click();
         // cy.contains('Anmelden').click();
      });

      it.only('Page Elements Check', () => {
         cy.visit(`${base_url}`);
         cy.viewport(1600, 1200);
         cy.location('protocol').should('eq', 'https:');
         // Title
         cy.title().should('eq', 'Login - StiftungSchweiz');
         //Submit button
         cy.get('[type="submit"][class="btn btn-primary disabled"]').should(
            'be.visible'
         );
         //Swiss pass Submit button
         cy.get('[type="button"][role="button"][class="btn"]').should(
            'be.visible'
         );
         //Search Page button exists
         cy.get('.search-text').should('have.text', 'Suchen').and('be.visible');
         cy.get('.ico-search-h').should('exist');

         //Registration Page button exists
         cy.get(
            '#login-link[href="https://stiftungen.stiftungschweiz.ch/registrieren"]'
         ).should('be.visible');

         //Open Hamburger Menu. Checking q-ty of navigation menu items
         cy.get('button[data-toggle="collapse"]').click();
         cy.get('.nav-item').should('have.length', 9); //Should be 9 elements
         cy.get('.submenu').should('exist');

         //Checking q-ty of list elements
         cy.get('#tab5Scdfa0qjR3D86ts0HiIUX').within(() => {
            cy.get('.col-md-5 > ul > li').should('have.length', 7);
         });

         //Cookies accept click
         cy.get('button[class="btn btn-primary btn-xxsm"]')
            .should('have.text', 'Verstanden')
            .click({ force: true });
         // .should('have.attr', 'href');
      });
   });
});
