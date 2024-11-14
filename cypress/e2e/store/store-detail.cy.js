describe('store-detail', () => {
    before(() => {
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}`), {fixture: 'detail/store-detail.json'}).as("store_detail");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/products`), {fixture: 'detail/store-products.json'}).as("store_products");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/stats/categories`), {fixture: 'detail/store-categories.json'}).as("store_categories");
    })

    beforeEach(() => {
        cy.visit(`http://localhost:5173/${Cypress.env("DEFAULT_STORE")}`);
        cy.wait(400);
    })

    it('see 19 products', () => {
        cy.get('.store-detail-product-list li').should('have.length', 19);
    })

    it('change from list to grid and viceversa', () => {
        cy.get('input#view-type').click({ force: true });
        cy.wait(100);
        cy.get('.store-detail-product-list').should('have.class', 'grid');

        cy.get('input#view-type').click({ force: true });
        cy.wait(100);
        cy.get('.store-detail-product-list').should('not.have.class', 'grid');
    })

    it('display the chart', () => {
        cy.get('button[data-action="show-chart"]').click({ force: true });
        cy.wait(100);
        cy.get('.modal-container canvas').should('be.visible');
    })

    it('display the create product modal', () => {
        cy.get('button[data-action="add-product"]').click({ force: true });
        cy.wait(100);
        cy.get('.modal-container form.add-product-form').should('be.visible');
    })
})
