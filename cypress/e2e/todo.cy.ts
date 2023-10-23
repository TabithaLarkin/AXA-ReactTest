/// <reference types="cypress" />

describe('The todo detail page', () => {
  it('should contain a cross if not complete', () => {
    cy.visit('/todo/3');

    cy.get('.complete-icon').should('contain', '❌');
  });

  it('should contain a tick if complete', () => {
    cy.visit('/todo/4');

    cy.get('.complete-icon').should('contain', '✔');
  });

  it('should contain a details about the todo item', () => {
    cy.visit('/todo/4');

    // The title of the todo should be displayed.
    cy.get('.todo-header>h2').should('contain', 'et porro tempora');

    // Details about the todo should be recorded.
    cy.get('.todo-detail').should('contain', 'Todo Id: 4').and('contain', 'Leanne Graham');
  });

  it('should display an error if a todo item is not found', () => {
    cy.visit('/todo/488');

    // A 404 should be reported for the todo not being found.
    cy.get('.warn')
      .should('contain', '404')
      // And it should contain details about the item that was attempted to be retrieved.
      .and('contain', '488');
  });

  it('should show the full title', () => {
    cy.visit('/todo/5');

    // Non-shortened title should be displayed.
    cy.get('.todo-header>h2').should(
      'contain',
      'laboriosam mollitia et enim quasi adipisci quia provident illum'
    );
  });
});
