/* global cy, describe, beforeEach, it, expect */
import i18n from '../../src/translations/i18n.js';

describe( 'Rental assistance program filtering', () => {

  beforeEach( () => {
    cy.intercept(
      'https://files.consumerfinance.gov/a/assets/raf/raf.json',
      { fixture: 'programs.json' }
    ).as(
      'programJSON'
    );
    cy.visit( 'http://localhost:3000/' );
    cy.wait('@programJSON');
    cy.waitForReact();
  } );

  it( 'shows a state and tribe but not county filter on load', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'state-select' } } ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'tribe-select' } } ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'county-select' } } ).should( 'not.exist' );
  } );

  it( 'shows state options in state dropdown', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'state-select' } } )
      .should( 'exist' )
      .click()
      .react( 'Option' )
      .should( 'have.length', 59 )
      .first()
      .should( 'contain', 'Alabama' );
  } );

  it( 'shows multiple results when state with multiple matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 20 );
    cy.react('Notification')
      .should( 'contain', '20' )
      .should( 
        'contain', 
        i18n.t( 'results.filtered.count', { count: 20 } ) 
      )
      .should( 'contain', i18n.t( 'results.filtered.explanation' ) )
      .should( 'have.class', 'm-notification__success');
  } );

  it( 'shows single result when state with one match is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'Connecticut{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 1 );
    cy.react('Notification')
      .should( 'contain', '1' )
      .should( 'contain', i18n.t( 'results.single_geographic.message' ) )
      .should( 'contain', i18n.t( 'results.single_geographic.explanation' ) )
      .should( 'have.class', 'm-notification__success');
  } );

  it( 'shows no results when territory with no matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'Federated{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'not.exist' );
    cy.react('Notification')
      .should( 'contain', i18n.t( 'results.none.message' ) )
      .should( 'contain', i18n.t( 'results.none.explanation' ) )
      .should( 'have.class', 'm-notification__warning');
  } );

  it( 'shows a county filter when state with many matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react( 'Filter', { props: { id:'county-select' } } )
      .should( 'exist' )
      .click()
      .react( 'Option' )
      .should( 'have.length', 58 )
      .first()
      .should( 'contain', 'Alameda' );
  } );

  it( 'shows sorted results when county option with multiple matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react( 'Filter', { props: { id:'county-select' } } )
      .should( 'exist' );
    cy.get( '#county-select' )
      .type( 'Alameda{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 4 )
      .then( items => {
        expect( items[0] ).to.contain( 'Fremont' );
        expect( items[1] ).to.contain( 'Oakland' );
        expect( items[2] ).to.contain( 'Alameda County' );
        expect( items[3] ).to.contain( 'California' );
      })
    cy.react('Notification')
      .should( 'contain', '4' )
      .should( 'contain', i18n.t( 'results.filtered.count', { count: 4 } ) )
      .should( 'contain', i18n.t( 'results.filtered.explanation' ) )
      .should( 'have.class', 'm-notification__success');
  } );

  it( 'does not show county filter when state with 1 result is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'Connecticut{enter}', { force: true } );
    cy.react( 'Filter', { props: { id:'county-select' } } )
      .should( 'not.exist' )
  } );
  
  it( 'shows tribe options in tribe dropdown', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'tribe-select' } } )
      .should( 'exist' )
      .click()
      .react( 'Option' )
      .should( 'have.length', 92 )
      .first()
      .should( 'contain', 'Akwesasne Housing Authority/ Saint Regis Mohawk Tribe' );
  } ); 

  it( 'shows tribe result when tribe selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'tribe-select' } } )
      .should( 'exist' )
    cy.get( '#tribe-select' ).type( 'Akwesasne{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 1 )
      .first()
      .should( 'contain', 'Akwesasne' );
    cy.react('Notification')
      .should( 'contain', i18n.t( 'results.single.message' ) )
      .should( 'contain', i18n.t( 'results.single.explanation' ) )
      .should( 'have.class', 'm-notification__success');
  } ); 

  it( 'shows multiple results when tribe and state selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.get( '#tribe-select' ).type( 'Akwesasne{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 21 )
      .last()
      .should( 'contain', 'Akwesasne' );
    cy.react('Notification')
      .should( 'contain', '21' )
      .should( 
        'contain', 
        i18n.t( 'results.filtered.count', { count: 21 } ) 
      )
      .should( 'contain', i18n.t( 'results.filtered.explanation' ) )
      .should( 'have.class', 'm-notification__success');
  } ); 

  it( 'shows all results after clearing filter', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react('ResultItem')
      .should( 'have.length', 396 );
    cy.react('Notification')
      .should( 'contain', '396' )
      .should( 'not.have.class', 'm-notification__success');
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 20 );
    cy.react('Notification')
      .should( 'contain', '20' )
      .should( 
        'contain', 
        i18n.t( 'results.filtered.count', { count: 20 } ) 
      )
      .should( 'contain', i18n.t( 'results.filtered.explanation' ) )
      .should( 'have.class', 'm-notification__success');
    cy.react( 'ClearIndicator' ).click();
    cy.react('ResultItem')
      .should( 'have.length', 396 );
    cy.react('Notification')
      .should( 'contain', '396' )
      .should( 'not.have.class', 'm-notification__success');
  } );

} );
