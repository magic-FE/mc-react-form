import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

const rootEl = document.getElementById('app');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
