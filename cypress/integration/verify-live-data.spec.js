import { processData, selectOption } from './helpers.js';
const programData = Cypress.env( 'programData' );

describe( 'Test results against live data', () => {
  before( () => {
    cy.visit( 'http://localhost:3000/' );
    cy.waitForReact();
  } );

  const [ stateData, countyData, statewidePrograms ] = processData( programData );
  const states = Object.keys( stateData );
  states.forEach( state => {
    const statePrograms = stateData[state];
    const count = statePrograms.length;
    const statewideProgramCount = Number( Boolean( statewidePrograms[state] ) );
    const vals = statePrograms.map( program => program.name ).join( '; ' );
    it( `should show ${ count } program${ count > 1 ? 's' : '' } for ${ state } -- (${ vals })`, () => {
      selectOption( 'state-select', state );
      cy.get( '.result-item' ).should( 'have.length', count );
    } );
    const programsByCounty = countyData[state];
    if ( programsByCounty ) {
      const counties = Object.keys( programsByCounty );
      counties.forEach( county => {
        const countyPrograms = programsByCounty[county];
        const count = countyPrograms.length + statewideProgramCount;
        const vals = countyPrograms.join( '; ' );
        it( `should show ${ count } programs for ${ county }, ${ state } -- (${ vals }; ${ state } state)`, () => {
          selectOption( 'state-select', state );
          selectOption( 'county-select', county );
          cy.get( '.result-item' ).should( 'have.length', count );
          if ( statewideProgramCount ) {
            cy.get( '.result-item h3' ).contains( state ).should( 'exist' );
          }
          countyPrograms.forEach( program => {
            cy.get( '.result-item h3' ).contains( program ).should( 'exist' );
          } );
        } );
      } );
    }
  } );

} );
