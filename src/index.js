import 'polyfill-array-includes';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import i18n from './translations/i18n'; 
import App from './App';

const root = document.getElementById('rental-assistance-finder');
const language = root.getAttribute( 'data-language' );
const countyThreshold = root.getAttribute( 'data-county-threshold' );

if ( language === 'es' ) {
  i18n.changeLanguage( language );
}

ReactDOM.render(
  <React.StrictMode>
    <App countyThreshold={ countyThreshold ? countyThreshold : undefined }/>
  </React.StrictMode>,
  root
);


