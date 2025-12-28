/// <reference types="cypress" />

describe('Admin Login test',()=> {

    it('Checking url - Positive test',() => {

        cy.visit("http://localhost:4200/login")
        cy.url().should('eq', 'http://localhost:4200/login')

    })

    it('Trying to Login as an Admin',()=>{
        cy.visit("http://localhost:4200/login");
        cy.get('input[name="username"]').type("Admin username");
        cy.get('input[name="password"]').type("Admin password");
        cy.get('button[type="submit"]').click();
        cy.url().should('contain','add-product');
    })


})