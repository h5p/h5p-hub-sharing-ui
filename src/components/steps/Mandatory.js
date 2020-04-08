import React, { useContext } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import PropTypes from 'prop-types';

import './Mandatory.scss';

const Mandatory = ({ mandatoryInfo, setMandatoryInfo, setIsValid }) => {

  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);

  /**
   * Is all mandatory fields filled?
   * 
   * @returns {bool}
   */
  const isValid = () => {
    if (mandatoryInfo.title === undefined || mandatoryInfo.title.trim().length === 0) {
      return false;
    }

    if (!mandatoryInfo.license) {
      return false;
    }

    // Check that license version is set for those licenses having a version
    const versions = getLicenseVersions(mandatoryInfo.license);
    if (versions.length !== 0 && !mandatoryInfo.licenseVersion) {
      return false;
    }

    return true;
  };

  /**
   * Update a field
   * 
   * @param {SyntheticEvent} event 
   * @param {string} name 
   */
  const updateField = (event, name) => {
    event.persist();
    
    setMandatoryInfo(() => {
      mandatoryInfo[name] = event.target.value.trim();
      return mandatoryInfo;
    });

    setIsValid(() => isValid());
  };

  /**
   * Get all licenses versions from a given license id
   * @param  {string} id
   */
  const getLicenseVersions = (id) => {
    for (let i = 0; i < metadata.licenses.length; i++) {
      if (metadata.licenses[i].id == id) {
        return metadata.licenses[i].versions;
      }
    }
    return [];
  }

  return (
    <>
      <FormElement label={l10n.title} mandatory={true}>
        <input id="title" onChange={e => updateField(e, 'title')}></input>
      </FormElement>
      <div className='form-element license-row'>
        <div className="license">
          <FormElement 
            label={l10n.license}
            description={l10n.licenseDescription}
            mandatory={true}
          >
            <Dropdown options={metadata.licenses} onChange={e => updateField(e, 'license')}></Dropdown>
          </FormElement>
        </div>
        <div className='license-version'>
          <FormElement
            label={l10n.licenseVersion}
            description={l10n.licenseVersionDescription}
            mandatory={true}
          >
            <Dropdown options={getLicenseVersions(mandatoryInfo.license)} onChange={e => updateField(e, 'licenseVersion')}></Dropdown>
          </FormElement>
        </div>
      </div>
      <FormElement
        label={l10n.disciplineLabel}
        description={l10n.disciplineDescription}
        mandatory={true}
      >
        <div>Discipline selector is coming soon...</div>
      </FormElement>
    </>
  );
};

Mandatory.protoTypes = {
  mandatoryInfo: PropTypes.object.isRequired,
  setMandatoryInfo: PropTypes.func.isRequired
}

export default Mandatory;