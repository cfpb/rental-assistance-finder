/* global cy, describe, beforeEach, it, expect */
const fixtureData = require( '../fixtures/programs.json' );
import { processData, selectOption } from './helpers.js';

describe( 'Test results against fixture data', () => {
  before( () => {
    cy.intercept(
      'https://files.consumerfinance.gov/a/assets/raf/raf.json',
      { fixture: 'programs.json' }
    ).as(
      'programJSON'
    );
    cy.visit( 'http://localhost:3000/' );
    cy.waitForReact();
    cy.wait( '@programJSON' );
  } );

  const [ stateData, countyData, statewidePrograms ] = processData( fixtureData );
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
