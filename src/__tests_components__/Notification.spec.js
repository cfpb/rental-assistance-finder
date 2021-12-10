import React from 'react';
import { mount } from '@cypress/react';
import Notification from '../Notification';

describe( 'Notification component', () => {
  it( 'renders a message, explanation, and links', () => {
    const msg = 'Test message';
    const explanation = 'More information';
    const link_a = { text: 'Link a', url: 'http://www.cf.gov' };
    const link_b = { text: 'Link b', url: 'http://cf.gov' };
    mount( <Notification message={msg}
      explanation={explanation}
      links={[ link_a, link_b ]}/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification_explanation' ).contains( explanation );
    cy.get( '.m-list_link' )
      .first()
      .contains( link_a.text )
      .should( 'have.attr', 'href', link_a.url );
    cy.get( '.m-list_link' )
      .last()
      .contains( link_b.text )
      .should( 'have.attr', 'href', link_b.url );
  } );

  it( 'renders a message and explanation without links', () => {
    const msg = 'Test message';
    const explanation = 'More information';
    mount( <Notification message={msg} explanation={explanation}/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification_explanation' ).contains( explanation );
    cy.get( '.m-list_link' ).should( 'not.exist' );
  } );

  it( 'renders just a message', () => {
    const msg = 'Test message';
    mount( <Notification message={msg}/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification_explanation' ).should( 'not.exist' );
    cy.get( '.m-list_link' ).should( 'not.exist' );
  } );

  it( 'renders only elements with content', () => {
    const msg = 'Test message';
    mount( <Notification message={msg} explanation='' links={[]}/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification_explanation' ).should( 'not.exist' );
    cy.get( '.m-list_link' ).should( 'not.exist' );
  } );

  it( 'applies class based on type prop', () => {
    const msg = 'Test message';
    mount( <Notification message={msg} type='random'/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification' ).should( 'have.class', 'm-notification__random' );
  } );

  it( 'has no svg or role by default', () => {
    const msg = 'Test message';
    mount( <Notification message={msg}/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( 'svg' ).should( 'not.exist' );
    cy.get( '.m-notification_content' ).should( 'not.have.attr', 'role', 'alert' );
  } );

  it( 'adds an svg and role for warnings', () => {
    const msg = 'Test message';
    mount( <Notification message={msg} type='warning'/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( 'svg' ).should( 'exist' );
    cy.get( '.m-notification_content' ).should( 'have.attr', 'role', 'alert' );
  } );

  it( 'adds a class and role for errors', () => {
    const msg = 'Test message';
    mount( <Notification message={msg} type='error'/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification' ).should( 'have.class', 'm-notification__error' );
    cy.get( '.m-notification_content' ).should( 'have.attr', 'role', 'alert' );
  } );

  it( 'adds an svg and class for loading', () => {
    const msg = 'Test message';
    mount( <Notification message={msg} type='loading'/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification' ).should( 'have.class', 'm-notification__loading' );
    cy.get( 'svg' ).should( 'exist' );
    cy.get( '.m-notification_content' ).should( 'not.have.attr', 'role', 'alert' );
  } );

  it( 'adds an svg and class for success', () => {
    const msg = 'Test message';
    mount( <Notification message={msg} type='success'/> );
    cy.get( '.m-notification_message' ).contains( msg );
    cy.get( '.m-notification' ).should( 'have.class', 'm-notification__success' );
    cy.get( 'svg' ).should( 'exist' );
    cy.get( '.m-notification_content' ).should( 'not.have.attr', 'role', 'alert' );
  } );

} );
