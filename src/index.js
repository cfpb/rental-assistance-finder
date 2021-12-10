import 'polyfill-array-includes';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import i18n from './translations/i18n';
import App from './App';
import {
  getCountyThreshold,
  setAppLanguage
} from './utils.js';

const container = document.getElementById( 'rental-assistance-finder' );
const countyThreshold = getCountyThreshold( container );
setAppLanguage( container, i18n );

ReactDOM.render(
  <React.StrictMode>
    <App countyThreshold={ countyThreshold }/>
  </React.StrictMode>,
  container
);
