import 'polyfill-array-includes';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('rental-assistance-finder')
);


