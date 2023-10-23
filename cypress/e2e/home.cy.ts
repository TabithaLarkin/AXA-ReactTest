/// <reference types="cypress" />

describe('The home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain todo items', () => {
    cy.get('.todoList').children().should('have.length', 200);
  });

  it('should shorten titles longer than 20 characters', () => {
    cy.get('#todo-2')
      .should('contain', 'quis ut nam facilis...')
      // title attribute should show the full title on hover though
      .and('have.attr', 'title', 'quis ut nam facilis et officia qui');
  });

  it('should be possible to filter todo items', () => {
    // Initial filter down to 3 items
    cy.get('#searchInput').type('porro');

    cy.get('.todoList').children().should('have.length', 3);

    // Add to filter, down to a single item
    cy.get('#searchInput').type(' te');

    cy.get('.todoList').children().should('have.length', 1);

    // Filter should not find any items after this addition
    cy.get('#searchInput').type('t');

    cy.get('.warn').should('have.length', 1);

    // Clear filter
    cy.get('#searchInput').clear();

    // All items should be visible once again.
    cy.get('.todoList').children().should('have.length', 200);
  });

  it('should navigate to an item when it is clicked', () => {
    cy.get('#todo-2').click();

    cy.location('pathname').should('eq', '/todo/2');
  });
});
