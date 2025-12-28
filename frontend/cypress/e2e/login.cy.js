/// <reference types="cypress" />

describe('Login test',()=> {

    it('Checking url - Positive test',() => {

        cy.visit("http://localhost:4200/login")
        cy.url().should('eq', 'http://localhost:4200/login')

    })

    it('Trying to Login',()=>{
        cy.visit("http://localhost:4200/login");
        cy.get('input[name="username"]').type("test123");
        cy.get('input[name="password"]').type("test123");
        cy.get('button[type="submit"]').click();
        cy.url().should('contain','products');
    })


})