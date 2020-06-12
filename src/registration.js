require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';

import TranslationContext from './context/Translation';
import Registration from './components/Registration/Registration';

window.H5PHub = window.H5PHub || {};

window.H5PHub.createRegistrationUI = ({
  container,
  l10n,
  licenseLink,
  registrationURL,
  accountSettingsUrl,
  token
}) => {
  ReactDOM.render(
    <TranslationContext.Provider value={l10n}>
      <Registration
        licenseLink={licenseLink}
        postUrl={registrationURL}
        accountSettingsUrl={accountSettingsUrl}
        token={token}
      />
    </TranslationContext.Provider>,
    container
  );
}
