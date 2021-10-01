import { processData, selectOption } from './helpers.js';
const programData = Cypress.env( 'programData' );

describe( 'Test results against live data', () => {
  before( () => {
    cy.visit( 'http://localhost:3000/' );
    cy.waitForReact();
  });

  const [ stateData, countyData ] = processData( programData );
  const states = Object.keys( stateData );

  states.forEach( state => {
    const statePrograms = stateData[state];
    const count = statePrograms.length;
    it(`should show all programs for ${state}`, () => {
      selectOption( 'state-select', state );
      cy.get('.result-item').should( 'have.length', count );
    });
    const programsByCounty = countyData[state];
    if ( programsByCounty ) {
      const counties = Object.keys( programsByCounty );
      counties.forEach( county => {
        const countyPrograms = programsByCounty[county];
        it(`should show all programs for ${county}, ${state}`, () => {
          selectOption( 'state-select', state );
          selectOption( 'county-select', county );
          cy.get('.result-item').should( 'have.length', countyPrograms.length + 1 );
          cy.get('.result-item h3').contains( state ).should( 'exist' );
          countyPrograms.forEach( program => {
            cy.get('.result-item h3').contains( program ).should( 'exist' );
          })
        })
      })
    }
  } )

});