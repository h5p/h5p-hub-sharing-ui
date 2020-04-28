import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import * as serviceWorker from './serviceWorker';
import TranslationContext from './context/Translation';
import MetadataContext from './context/Metadata';
import l10n from './test/en.js';
import licenses from './test/licenses.js';
import disciplines from './test/disciplines.js';
import languages from './test/languages.js';
import levels from './test/levels.js';
import Metadata from './utils/metadata';

import './index.css';

const metadata = new Metadata({
  licenses: licenses,
  disciplines: disciplines,
  languages: languages,
  levels: levels
});

const publishURL = 'http://localhost/d7/post.php';
const contentType = 'Interactive video';
const language = 'en';
const title = 'My fantastic H5P';

ReactDOM.render(
  <React.StrictMode>
    <TranslationContext.Provider value={l10n}>
      <MetadataContext.Provider value={metadata}>
        <Main 
          title={title}
          publishURL={publishURL}
          contentType={contentType}
          language={language}
        />
      </MetadataContext.Provider>
    </TranslationContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
