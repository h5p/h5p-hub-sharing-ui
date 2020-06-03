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
import licenseAgreementMainText from './test/licenseAgreement.js'
import Metadata from './utils/metadata';
import Registration from './components/Registration/Registration';

import './index.css';

const metadata = new Metadata({
  licenses: licenses,
  disciplines: disciplines,
  languages: languages,
  levels: levels
});

// Publish
const publishURL = 'http://localhost/d7/post.php';
const contentType = 'Interactive video';
const language = 'en';
const title = 'My fantastic H5P';

// Registration
const registrationURL = 'http://localhost/d7/post.php';
const registrationTitle = 'Hub Registration and End User License Agreement (EULA)';
const licenseAgreementTitle = 'End User Licence Agreement (EULA)';
const licenseAgreementDescription = 'Please read the following agreement before proceeding with the ';
const accountSettingsUrl= '';

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
  document.getElementById('publish')
);

ReactDOM.render(
  <React.StrictMode>
    <TranslationContext.Provider value={l10n}>
        <Registration
        mainTitle={registrationTitle}
        licenseAgreementTitle={licenseAgreementTitle}
        licenseAgreementDescription={licenseAgreementDescription}
        licenseAgreementMainText={licenseAgreementMainText}
        postUrl={registrationURL}
        accountSettingsUrl={accountSettingsUrl}
        />
    </TranslationContext.Provider>
  </React.StrictMode>,
  document.getElementById('register')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
