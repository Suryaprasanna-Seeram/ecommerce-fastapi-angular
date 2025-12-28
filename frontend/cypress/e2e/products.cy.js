/// <reference types="cypress" />

describe('Products Page',()=>{

    it('Test - Products list Functionality',()=>{
        cy.visit("http://localhost:4200/products");
        cy.url().should('include', '/products');
        cy.contains('h2', 'Products').should('be.visible');
    })

    it('Test - Products add to card Functionality',()=>{
        cy.visit("http://localhost:4200/login");
        cy.get('input[name="username"]').type("test123");
        cy.get('input[name="password"]').type("test123");
        cy.get('button[type="submit"]').click();
        cy.url().should('contain','products');
        cy.get("#bt1").click();
        cy.on('window:confirm',(t)=>{
            expect(t).to.contains('Product added to cart')

        })
    })
})