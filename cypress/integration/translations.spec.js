/* global cy, describe, beforeEach, it, expect */
import es from '../../src/translations/es.json';
import i18n from '../../src/translations/i18n.js';
i18n.changeLanguage( 'es' );

describe( 'Status message translations', () => {

  beforeEach( () => {
    cy.intercept( 'http://localhost:3000', { fixture: 'es.html' } );
  } );

  it( 'shows a loading notification while waiting for api response', () => {
    cy.visit( 'http://localhost:3000/' );
    cy.get( '.m-notification' )
      .should( 'have.length', 1 )
      .should( 'have.class', 'm-notification__loading' )
      .should( 'contain', es.app.loading );
  } );

  it( 'shows a warning notification if data not returned from api', () => {
    cy.intercept(
      'https://files.consumerfinance.gov/a/assets/raf/raf.json',
      { statusCode: 404 }
    ).as(
      'programJSON'
    );
    cy.visit( 'http://localhost:3000/' );
    cy.wait('@programJSON');
    cy.get( '.m-notification' )
      .should( 'have.length', 1 )
      .should( 'not.have.class', 'm-notification__loading' )
      .should( 'have.class', 'm-notification__warning' )
      .should( 'contain', es.app.unavailable_message )
      .should( 'contain', es.app.unavailable_explanation );
  } );

} );

describe( 'Filtering and results translations', () => {

  beforeEach( () => {
    cy.intercept('http://localhost:3000', { fixture: 'es.html' });
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

  it( 'shows all results message on page load and translated result labels', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react('ResultItem')
      .should( 'have.length', 396 )
      .first()
      .find( 'dt' )
      .then( items => {
        expect( items[0] ).to.contain( es.fields.state );
        expect( items[1] ).to.contain( es.fields.name );
        expect( items[2] ).to.contain( es.fields.type );
        expect( items[3] ).to.contain( es.fields.status );
        expect( items[4] ).to.contain( es.fields.contact );
      });
    cy.react('Notification')
      .should( 
        'contain', 
        i18n.t( 'results.all.count', { count: 396 } ) 
      );
  } );

  it( 'shows translated filter labels and legend', () => {
    cy.react( 'Filters' ).should( 'exist' )
      .find( 'h2' )
      .should( 'contain', es.filters.legend );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.get( 'label[for="state-select"]' )
      .should( 'contain', es.filters.state.label )
    cy.get( 'label[for="county-select"]' )
      .should( 'contain', es.filters.county.label );
    cy.get( 'label[for="tribe-select"]' )
      .should( 'contain', es.filters.tribe.label );
  } );

  // This test depends on the current data fixture (programs.json), so updating the data may break it.
  it( 'shows translated statuses', () => {
    cy.react( 'Filters' ).should( 'exist' )
      .find( 'h2' )
      .should( 'contain', es.filters.legend );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react('ResultItem').first().find( '.status-row dd' )
      .should( 'contain', es.statuses.waitlist )
      .should( 'have.class', 'status-waitlist' );      
    cy.react('ResultItem').eq( 2 ).find( '.status-row dd' )
      .should( 'contain', es.statuses.accepting )
      .should( 'have.class', 'status-accepting' );
    cy.react('ResultItem').eq( 1 ).find( '.status-row dd' )
      .should( 'contain', es.statuses.rolling )
      .should( 'have.class', 'status-rolling' );
  } );

  it( 'shows filtered results message when state with multiple matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 20 );
    cy.react('Notification')
      .should( 
        'contain', 
        i18n.t( 'results.filtered.count', { count: 20 } ) 
      )
      .should( 'contain', es.results.filtered.explanation_plural )
      .should( 'have.class', 'm-notification__success');
  } );

  it( 'shows single geographic result message when state with one match is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'Connecticut{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 1 );
    cy.react('Notification')
      .should( 'contain', es.results.single_geographic.message )
      .should( 'contain', es.results.single_geographic.explanation )
      .should( 'have.class', 'm-notification__success');
  } );

  it( 'shows no results message when territory with no matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'Federated{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'not.exist' );
    cy.react('Notification')
      .should( 'contain', es.results.none.message )
      .should( 'contain', es.results.none.explanation )
      .should( 'have.class', 'm-notification__warning');
  } );

  it( 'shows filtered results message when county option with multiple matches is selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.react( 'Filter', { props: { id:'county-select' } } )
      .should( 'exist' );
    cy.get( '#county-select' )
      .type( 'Alameda{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 4 )
    cy.react('Notification')
      .should( 'contain', i18n.t( 'results.filtered.count', { count: 4 } ) )
      .should( 'contain', es.results.filtered.explanation )
      .should( 'have.class', 'm-notification__success');
  } );


  it( 'shows single result message when only tribe selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react( 'Filter', { props: { id:'tribe-select' } } )
      .should( 'exist' )
    cy.get( '#tribe-select' ).type( 'Akwesasne{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 1 )
      .first()
      .should( 'contain', 'Akwesasne' );
    cy.react('Notification')
      .should( 'contain', es.results.single.message )
      .should( 'contain', es.results.single.explanation )
      .should( 'have.class', 'm-notification__success');
  } ); 

  it( 'shows filtered results message when tribe and state selected', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.get( '#state-select' ).type( 'California{enter}', { force: true } );
    cy.get( '#tribe-select' ).type( 'Akwesasne{enter}', { force: true } );
    cy.react('ResultItem')
      .should( 'have.length', 21 )
      .last()
      .should( 'contain', 'Akwesasne' );
    cy.react('Notification')
      .should( 
        'contain', 
        i18n.t( 'results.filtered.count', { count: 21 } ) 
      )
      .should( 'contain', es.results.filtered.explanation )
      .should( 'have.class', 'm-notification__success');
  } ); 

} );
