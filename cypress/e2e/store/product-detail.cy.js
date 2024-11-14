describe('product-detail', () => {
    before(() => {
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}`), {fixture: 'detail/store-detail.json'}).as("store_detail");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/products`), {fixture: 'detail/store-products.json'}).as("store_products");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/stats/categories`), {fixture: 'detail/store-categories.json'}).as("store_categories");
        cy.intercept('GET', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/products/${Cypress.env("DEFAULT_PRODUCT")}`), {fixture: 'detail/product-detail.json'}).as("store_products");
    })

    beforeEach(() => {
        cy.visit(`http://localhost:5173/${Cypress.env("DEFAULT_STORE")}/product/${Cypress.env("DEFAULT_PRODUCT")}`);
        cy.wait(400);
    })

    it('see the reviews', () => {
        cy.get("ul.product-reviews li").should('have.length', 3);
    })

    it('delete the product', () => {
        cy.intercept('DELETE', new RegExp(`${Cypress.env("BASE_URL")}/api/stores/${Cypress.env("DEFAULT_STORE")}/products/${Cypress.env("DEFAULT_PRODUCT")}`), (req) => {
            req.reply(200);
        }).as("delete_product");

        cy.get('button[data-action="delete-product"]').click({ force: true });
        cy.wait(100);
        cy.get('.modal-container').should('be.visible');
        cy.get('.modal-container button.button--danger').click({ force: true });
        cy.wait(100);
        cy.url().should('equal', `http://localhost:5173/${Cypress.env("DEFAULT_STORE")}`);
    })
})
