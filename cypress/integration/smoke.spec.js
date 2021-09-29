/* global cy, describe, beforeEach, it, expect */

// Smoke tests use live data from API
let totalNumResults;

describe( 'Rental assistance programs app', () => {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/' );
    cy.waitForReact();
  } );

  it( 'shows a loading notification on page load', () => {
    cy.react( 'Notification' ).should( 'have.class', 'm-notification__loading' );
  } );

  it( 'eventually loads the content and removes the loading notification', () => {
    cy.react( 'Filters' ).should( 'exist' );
    cy.react( 'Notification' ).should( 'not.have.class', 'm-notification__loading' );
  } );

  it( 'reports the correct number of items', () => {
    cy.react( 'Filters' ).should( 'exist' );
    // eslint-disable-next-line
    cy.get( '.m-notification_message' ).then( $message => {
      const message = $message.text();
      expect( message ).not.to.be.undefined;

      // Grab the number of total items from the notification message
      const messageMatch = $message.text().match( /^.+(\d\d\d).+$/ );
      expect( messageMatch ).not.to.eq( null );

      // Compare the number of returned items to the total number of items
      totalNumResults = parseInt( messageMatch[1], 10 );
      cy.react( 'ResultItem' ).should( 'have.length', totalNumResults );
    } );

  } );

  it( 'filters by state or territory', () => {
    // Filtering by a state should reduce the number of results
    cy.get( '#state-select' ).type( 'ifornia{enter}', { force: true } );
    cy.react( 'ResultItem' ).its( 'length' ).should( 'be.lt', totalNumResults );

    // Clicking the clear icon should reset the filter
    cy.react( 'ClearIndicator' ).click();
    cy.react( 'ResultItem' ).its( 'length' ).should( 'eq', totalNumResults );
  } );

  it( 'filters by tribe', () => {
    // Filtering by a tribe should reduce the number of results
    cy.get( '#tribe-select' ).type( 'chero{enter}', { force: true } );
    cy.react( 'ResultItem' ).its( 'length' ).should( 'be.lt', totalNumResults );

    // Clicking the clear icon should reset the filter
    cy.react( 'ClearIndicator' ).click();
    cy.react( 'ResultItem' ).its( 'length' ).should( 'eq', totalNumResults );
  } );

} );
