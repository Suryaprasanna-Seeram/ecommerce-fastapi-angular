/// <reference types="cypress" />

describe('Adding Products',()=> {

    it('Checking url - Positive test',() => {

        cy.visit("http://localhost:4200/login")
        cy.url().should('eq', 'http://localhost:4200/login')

    })

    it('Trying to Login as an Admin',()=>{
        cy.visit("http://localhost:4200/login");
        cy.get('input[name="username"]').type("Admin-username");
        cy.get('input[name="password"]').type("Password");
        cy.get('button[type="submit"]').click();
        cy.url().should('contain','add-product');
        cy.get("input[name='name']").type("Water Bottle");
        cy.get("textarea.ng-pristine ").type("A Good Quality Pink colour Water bottle.") ;
        cy.get("input[name='price']").type("70");
        cy.contains('button','Add Product').click();
        cy.get("p[id='para1']").should("be.visible");
    
    })



})