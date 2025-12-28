/// <reference types="cypress" />

describe('End to End flow',()=>{

    it('Test - Register  to Cart Flow ',()=>{
        cy.visit("http://localhost:4200/register");
        cy.get("input[name='firstname']").type("Test");
        cy.get("input[name='lastname']").type("Testlast");
        cy.get("input[name='phone']").type("8790224504");
        cy.get("input[name='username']").type("test123");
        cy.get("input[name='password']").type("test123");
        cy.get("button[type='submit']").click();
       // cy.get("p[id='message1']").should('contain','Registration successful');
        cy.url().should('contain','/login');
        cy.contains('a','Login').click();
        cy.url().should('contain','/login');
        cy.get('input[name="username"]').type("test123");
        cy.get('input[name="password"]').type("test123");
        cy.get('button[type="submit"]').click();
        cy.url().should('contain','products');
        cy.contains('b','Laptop').should('be.visible');
      
        // Adding products to cart
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