/// <reference types="Cypress" />

it('By ID', () => {
   cy.visit('https://stiftungen.stiftungschweiz.ch/login');
   cy.get('#signinEmail1')
      .type('dmytro+1@freihandlabor.com')
      .should('eq', 'gmail.com');
   cy.get('#signinPassword1')
      .type('PA$$W0rd!!')
      .invoke('attr', 'placeholder')
      .should('contain', 'Password');
});

it('By Class ', () => {
   cy.get('.btn btn-primary').should('be.visible').click();
});

it('By Tag', () => {
   cy.get('nav').contains('About Us');
});

it('By Tag Value', () => {
   cy.get('[data-name="login"]'); // Tag with value have to be in []
});

it('By Several Tags', () => {
   cy.get(
      '[data-name="login"][href="https://stiftungen.stiftungschweiz.ch/auth/google/sign-in"]'
   );
});

it('By Several Types', () => {
   cy.get('button[type="button"][role="button"]');
});

it.only('By contains name', () => {
   cy.viewport(1600, 1200);
   cy.visit('https://stiftungen.stiftungschweiz.ch/login');

   cy.contains('Passwort vergessen?').click();
   cy.contains('Suchen').should('be.visible').click();
   cy.contains('Suchen').should('have.text', 'Suchen');
   cy.get('[class="search-text"]').should('have.text', 'Suchen').click();
});

// SCH NavBar
cy.get('div#navbarSupportedContent li.nav-item');

cy.get('.error').should('be.empty'); // Assert that '.error' is empty
cy.contains('Login').should('be.visible'); // Assert that el is visible
cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar'); // Assert the 'foo' property equals 'bar'
