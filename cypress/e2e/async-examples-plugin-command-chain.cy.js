// ************************************************************************************************
// This file contains examples of Cypress commands and JavaScript synchronous code from the article
// "The Async Nature of Cypress: Don't Mess with the Timelines in Your Cypress Tests' Dual-Verse"
// [URL]
// ************************************************************************************************

// Import the Cypress command chain plugin
// This plugin adds a queue list to the Cypress Command Log, showing all commands
// (finished, current, and enqueued) for the current test.
import 'cypress-command-chain'

// Cypress Commands and JS Sync Code
it('Test 1', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
            let id = response.body.userId  // userId value is 1
            cy.wrap(id).should('equal', 1)  // Pass! (because id == 1)
            id = id + 1  // id set to 2
            expect(id).to.equal(2)  // Pass! (because id == 2)
        })
});


// Only Cypress Commands
it('Test 2', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1')
        .its('body.userId')
        .should('eq', 1) // Pass! (because userId == 1)
        .then((id) => id + 1) // Increment id directly
        .should('eq', 2); // Pass! (because id == 2)
});


// Cypress Commands (with 2 .then()) and JS Sync Code
it('Test 3 ', () => {
    let id = null;  // id set to null

    cy.request('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
            id = response.body.userId  // userId value is 1
    }).then(() => {
        cy.wrap(id).should('equal', 1)  // Pass! (because id == 1)
        id = id + 1  // id set to 2
        expect(id).to.equal(2)  // Pass! (because id == 2)
    })
});


// Cypress Commands (with 2 .then()), JS Sync Code and expect() outside the last .then()
it('Test 4', () => {
    let id = null;  // id set to null

    cy.request('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
            id = response.body.userId  // userId value is 1
    }).then(() => {
        cy.wrap(id).should('equal', 1)  // Pass! (because id == 1)
        id = id + 1  // id set to 2
        expect(id).to.equal(2)  // Pass! (because id == 2)
    })

    expect(id).to.equal(2) // Fail!!! (because id == null)
});


// Cypress Commands (with 2 .then()), JS Sync Code and should() outside the last .then()
it('Test 5', () => {
    let id = null;  // id set to null

    cy.request('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
            id = response.body.userId  // userId value is 1
    }).then(() => {
        cy.wrap(id).should('equal', 1)  // Pass! (because id == 1)
        id = id + 1  // id set to 2
        expect(id).to.equal(2)  // Pass! (because id == 2)
    })

    cy.wrap(id).should('equal', 2) // Will Fail!!! (because id == null)
});



// Cypress Commands (with 3 .then() one of them standalone at the end of the test)
it('Test 6', () => {
    let id = null;  // id set to null

    cy.request('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
            id = response.body.userId  // userId value is 1
    }).then(() => {
        cy.wrap(id).should('equal', 1)  // Pass! (because id == 1)
        id = id + 1  // id set to 2
        expect(id).to.equal(2)  // Pass! (because id == 2)
    })

    cy.then(() => {
        expect(id).to.equal(2) // Pass! (because id == 2)
        cy.wrap(id).should('equal', 2) //Pass! (because id == 2)
    })
});
