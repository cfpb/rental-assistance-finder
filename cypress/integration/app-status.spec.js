/* global cy, describe, beforeEach, it, expect */

describe( 'Rental assistance programs app status', () => {

  it( 'shows a loading notification while waiting for api response', () => {
    cy.visit( 'http://localhost:3000/' );
    cy.get( '.m-notification' )
      .should( 'have.length', 1 )
      .should( 'have.class', 'm-notification__loading' );
  } );

  it( 'shows a notification and results if data is returned from api', () => {
    cy.intercept(
      'https://files.consumerfinance.gov/a/assets/raf/raf.json',
      { fixture: 'programs.json' }
    ).as(
      'programJSON'
    );
    cy.visit( 'http://localhost:3000/' );
    cy.wait('@programJSON');
    cy.get( '.rental-assistance-finder' )
      .should( 'exist' )
    cy.get( '.m-notification' )
      .should( 'have.length', 1 )
      .should( 'not.have.class', 'm-notification__loading' )
      .should('contain', '396');
    cy.get( '.result-item' )
      .should( 'have.length', 396 );
  } );


  it( 'shows a warning notification if data not returned from api', () => {
    cy.intercept(
      'https://files.consumerfinance.gov/a/assets/raf/raf.json',
      { statusCode: 400 }
    ).as(
      'programJSON'
    );
    cy.visit( 'http://localhost:3000/' );
    cy.wait('@programJSON');
    cy.get( '.m-notification' )
      .should( 'have.length', 1 )
      .should( 'not.have.class', 'm-notification__loading' )
      .should( 'have.class', 'm-notification__warning' );
  } );

  it( 'shows a warning notification if data format incorrect', () => {
    cy.intercept(
      'https://files.consumerfinance.gov/a/assets/raf/raf.json',
      { body: [{
         "type":"State",
         "state":"Alabama",
         "program":"Alabama Emergency Rental Assistance Program",
         "name":"Alabama",
         "url":"https://eraalabama.com/"
      }] }
    ).as(
      'programJSON'
    );
    cy.visit( 'http://localhost:3000/' );
    cy.wait('@programJSON');
    cy.get( '.m-notification' )
      .should( 'have.length', 1 )
      .should( 'not.have.class', 'm-notification__loading' )
      .should( 'have.class', 'm-notification__warning' );
  } );
} );
