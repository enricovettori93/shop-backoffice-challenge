describe('stores', () => {
    before(() => {
        cy.intercept('GET', `${Cypress.env("BASE_URL")}/api/stores`, {fixture: 'stores.json'}).as("stores");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}`), {fixture: 'detail/store-detail.json'}).as("store_detail");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/products`), {fixture: 'detail/store-products.json'}).as("store_products");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/stats/categories`), {fixture: 'detail/store-categories.json'}).as("store_categories");
    })

    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(400);
    })

    it('display the store list', () => {
        cy.get('.store-list li').should('have.length', 1);
    })

    it('go to the store detail', () => {
        cy.get('.store-list li a').click();
        cy.url().should('include', Cypress.env("DEFAULT_STORE"));
    })
})
