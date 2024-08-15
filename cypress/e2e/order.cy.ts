import { testUrl } from '../constants/constans';

describe('handle order', function () {
  this.beforeEach(() => {
    cy.intercept('POST', `api/auth/login`, {
      fixture: 'userData.json'
    });
    cy.intercept('GET', `api/auth/user`, {
      fixture: 'user.json'
    });
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.intercept('POST', `api/orders`, {
      fixture: 'orders.json'
    });

    cy.setCookie('accessToken', '123key');
    window.localStorage.setItem('key', '123');
    cy.visit(testUrl);
  });

  this.afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('key');
  });

  it('burger should build and ordered', function () {
    const mainButton = cy.get('[data-cy=643d69a5c3f7b9001cfa093e] > button');
    const bunButton = cy.get('[data-cy=643d69a5c3f7b9001cfa093c] > button');
    const sauceButton = cy.get('[data-cy=643d69a5c3f7b9001cfa0942] > button');

    mainButton.click();
    bunButton.click();
    sauceButton.click();

    const orderButton = cy.get('[data-cy=orderButton] > button');
    orderButton.click();

    const modalContainer = cy.get('[data-cy=modal]');
    modalContainer.should('contain', '11111');

    const modalCloseButton = cy.get('[data-cy=modalCloseButton]');
    modalCloseButton.click();
    modalContainer.should('not.exist');

    const constructorContainer = cy.get('[data-cy=burgerConstructor');
    constructorContainer
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
  });
});
