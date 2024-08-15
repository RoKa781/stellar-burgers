import { testUrl } from '../constants/constans';

describe('handle add ingredient', function () {
  this.beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.visit(testUrl);
  });

  it('add ingredient on button click', function () {
    const mainButton = cy.get('[data-cy=643d69a5c3f7b9001cfa093e] > button');
    const bunButton = cy.get('[data-cy=643d69a5c3f7b9001cfa093c] > button');
    const sauceButton = cy.get('[data-cy=643d69a5c3f7b9001cfa0942] > button');

    mainButton.click();
    bunButton.click();
    sauceButton.click();

    cy.get('[data-cy=constructorBunTop]').should('exist');
    cy.get('[data-cy=constructorBunBottom]').should('exist');
    cy.get('[data-cy=constuctorIngredientId643d69a5c3f7b9001cfa093e]').should('exist');
    cy.get('[data-cy=constuctorIngredientId643d69a5c3f7b9001cfa0942]').should('exist');
  });
});
