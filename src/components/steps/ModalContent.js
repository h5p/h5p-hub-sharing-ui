import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../generic/accordion/Accordion';
import MetadataContext from '../../context/Metadata';
import TranslationContext from '../../context/Translation';
import Button from '../generic/button/Button';

import './ModalContent.scss';

/**
 * Get licenses or license versions if they exist for a given license
 *
 * @param license
 * @returns {{name: string, id: string, url: string}[]}
 */
const getLicenseVersions = (license) => {
  if (license.versions.length) {
    return license.versions.map(version => ({
      id: `${license.id}-${version.id}`,
      name: `${license.name} ${version.name}`,
      url: version.url
    }));
  }

  return [license];
}

/**
 * Get licenses in a listable format
 *
 * @param arr
 * @param license
 * @returns {any[]}
 */
const getLicensesReducer = (arr, license) => {
  if (license.licenses) {
    // Flatten option group
    const licenses = license.licenses.reduce((optGroupArr, optGroupLicense) => {
      const licenseVersions = getLicenseVersions(optGroupLicense);
      return optGroupArr.concat(licenseVersions);
    }, []);
    return arr.concat(licenses);
  }

  const licenseVersions = getLicenseVersions(license);
  return arr.concat(licenseVersions);
}

const ModalContent = React.forwardRef(({closeModal}, ref) => {

  const metadata = React.useContext(MetadataContext);
  const l10n = React.useContext(TranslationContext);

  return (
    <>
      <div className='h5p-hub-dialog-header'>
        <div className='h5p-hub-dialog-title'>
          <span>{l10n.contentLicenseTitle}</span>
          <Button onClick={closeModal} ref={ref}>{l10n.close}</Button>
        </div>
        <div className='h5p-hub-dialog-description'>
          {l10n.licenseDialogDescription}
        </div>
      </div>
      <div className='h5p-hub-dialog-content'>
        <Accordion>{metadata.licenses.reduce(getLicensesReducer, []).map(license =>
          <div key={license.id} id={'h5p-hub-' + license.id} header={license.name}>
            <a href={license.url} target="_blank">{license.url}</a>
          </div>
        )}
        </Accordion>
      </div>
    </>
  );
});

ModalContent.displayName = 'ModalContent';

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalContent;


