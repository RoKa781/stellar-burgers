import { testUrl } from '../constants/constans';

function findAndClickOnIngredient() {
  const ingredient = cy.get('[data-cy=643d69a5c3f7b9001cfa0941] > a');
  ingredient.click();
}

describe('handle modals', function () {
  this.beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.visit(testUrl);
  });

  it('shoud open ingredient modal', function () {
    findAndClickOnIngredient();
    cy.location('href').should(
      'eq',
      `${testUrl}ingredients/643d69a5c3f7b9001cfa0941`
    );

    const ingredientDetails = cy.get('[data-cy=ingredientDetails]');
    ingredientDetails.should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('shoud close ingredient modal by click on x', function () {
    findAndClickOnIngredient();
    const ingredientDetails = cy.get('[data-cy=modalCloseButton]');
    ingredientDetails.click();
    cy.location('href').should('eq', testUrl);
  });
});
