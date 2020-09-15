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
  hubContent,
  context
}) => {

  /**
   * Replace given values with already existing values in the source.
   *
   * @param {Object} source Source object
   * @param {Object} values Key value
   */
  const remap = (source, values) => {
    for (let value in values) {
      if (values.hasOwnProperty(value) && source.hasOwnProperty(value)) {
        source[value] = source[values[value]];
      }
    }
    return source;
  };
  
  ReactDOM.render(
    <TranslationContext.Provider value={context === 'edit' ? remap(l10n, {
      mainTitle: 'editInfoTitle',
      reviewAndShare: 'reviewAndSave',
      share: 'saveChanges',
      shareFailed: 'editingFailed',
      isNowSubmitted: 'changeHasBeenSubmitted',
      contentAvailable: 'contentUpdateSoon'
    }) : l10n}>
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
