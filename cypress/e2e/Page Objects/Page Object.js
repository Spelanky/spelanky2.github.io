class Form {
   Email() {
      return cy.get('#email'); //Get input field by ID
   }
   Name() {
      return cy.get('#name');
   }
   Message() {
      return cy.get('.message-id');
   }
   Attachment() {
      return cy.get('#attachment');
   }
   Attachment2() {
      return cy.get('#attachment2');
   }
   Honey() {
      return cy.get('#honey');
   }
   Birthday() {
      return cy.get('#birthday');
   }
   Season() {
      return cy.get('[name="season"]');
   }

   btnSubmit() {
      return cy.get("button[type='submit']");
   }
}
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

export default { Form, Random };
