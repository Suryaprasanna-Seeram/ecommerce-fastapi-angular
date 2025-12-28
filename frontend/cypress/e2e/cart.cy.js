/// <reference types="cypress" />

describe('Cart Page',()=>{

    it('Test - Products list Functionality',()=>{
        cy.visit("http://localhost:4200/cart");
        cy.url().should('include', '/cart');
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
        cy.contains('a','Cart').click();
        cy.contains('h2','My Cart').should('be.visible');
        cy.contains('button','Remove').click();
        cy.get("p[id='c1']").should('contain','Item removed from cart');
        
        })
    
})