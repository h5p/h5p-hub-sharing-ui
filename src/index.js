import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Components/Main';
import * as serviceWorker from './serviceWorker';
import TranslationContext from './context/Translation';
import l10n from './test/en.js';

ReactDOM.render(
  <React.StrictMode>
    <TranslationContext.Provider
      value={l10n}
    >
      <Main />
    </TranslationContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
