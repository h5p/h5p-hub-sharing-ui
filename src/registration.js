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
  redirectURL,
  accountSettingsUrl,
  token,
  accountInfo,
}) => {
  ReactDOM.render(
    <TranslationContext.Provider value={l10n}>
      <Registration
        licenseLink={licenseLink}
        postUrl={registrationURL}
        redirectUrl={redirectURL}
        accountSettingsUrl={accountSettingsUrl}
        token={token}
        accountInfo={accountInfo || {}}
      />
    </TranslationContext.Provider>,
    container
  );
}
