/// <reference types="cypress" />

describe('End to end testing of Light-Dark Mode site', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
    })

    it('Testing first song and functionalities', () => {
        cy.get('img').should('have.attr', 'src', 'img/jacinto-1.png').and('have.css', 'height', '300px').and('have.css', 'width', '300px')
        cy.get('#play').click()
        cy.get('#play').should('have.attr', 'title', 'Pause')
        cy.get('#title').should('have.text', 'Witcher chill world 01')
        cy.get('#artist').should('have.text', 'Geralt of Rivia')
        cy.get('#play').click()
        cy.get('#play').should('have.attr', 'title', 'Play')


    })
    it('Testing second song and functionalities', () => {
        cy.get('#next').click()
        cy.get('img').should('have.attr', 'src', 'img/jacinto-2.png').and('have.css', 'height', '300px').and('have.css', 'width', '300px')
        cy.get('#play').click()
        cy.get('#play').should('have.attr', 'title', 'Play')
        cy.get('#title').should('have.text', 'Witcher chill world 02')
        cy.get('#artist').should('have.text', 'Geralt of Rivia')
        cy.get('#play').click()
        cy.get('#play').should('have.attr', 'title', 'Pause')


    })
    it('Testing third song and backwards buttons', () => {
        cy.get('#prev')
        cy.get('#prev')
        cy.get('img').should('have.attr', 'src', 'img/jacinto-1.png').and('have.css', 'height', '300px').and('have.css', 'width', '300px')
    })
    it('Testing progress bar', () => {
        cy.get('#play').click()
        cy.get('#progress-container').then($bar => {
            const fullWidth = $bar.width();
            cy.wrap($bar).click(fullWidth / 2, 0);
        });
        cy.get('#play').click()
        cy.get('#current-time').should("contain", "2:03")
        cy.get("#progress").should("have.attr", "style", "width: 50%;")
    })

})