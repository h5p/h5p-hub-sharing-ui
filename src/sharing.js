require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';

import TranslationContext from './context/Translation';
import MetadataContext from './context/Metadata';
import Main from './components/Main';
import Metadata from './utils/metadata';

window.H5PHub = window.H5PHub || {};

window.H5PHub.createSharingUI = (container, {
  l10n,
  metadata,
  title,
  publishURL,
  contentType,
  language,
  token,
  hubContent
}) => {
  ReactDOM.render(
    <TranslationContext.Provider value={l10n}>
      <MetadataContext.Provider value={new Metadata(metadata)}>
        <Main
          title={title}
          publishURL={publishURL}
          contentType={contentType}
          language={language}
          token={token}
          hubContent={hubContent}
        />
      </MetadataContext.Provider>
    </TranslationContext.Provider>,
    container
  );
}
