/// <reference types="cypress" />

describe('Register',()=>{

    it('Test - Register Functionality',()=>{
        cy.visit("http://localhost:4200/register");
        cy.get("input[name='firstname']").type("Test");
        cy.get("input[name='lastname']").type("Testlast");
        cy.get("input[name='phone']").type("8790224504");
        cy.get("input[name='username']").type("test123");
        cy.get("input[name='password']").type("test123");
        cy.get("button[type='submit']").click();
       // cy.get("p[id='message1']").should('contain','Registration successful');
        cy.url().should('contain','/login');


    })
})