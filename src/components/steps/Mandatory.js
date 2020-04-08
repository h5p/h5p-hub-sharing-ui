import React, { useContext } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import PropTypes from 'prop-types';
import {mandatoryDefinition} from '../../utils/helpers';

import './Mandatory.scss';

/**
 * Get all licenses versions from a given license id
 * @param  {string} id
 */
const getLicenseVersions = (licenses, id) => {
  for (let i = 0; i < licenses.length; i++) {
    if (licenses[i].id == id) {
      return licenses[i].versions;
    }
  }
  return [];
}

const Mandatory = ({ mandatoryInfo, setMandatoryInfo, setIsValid }) => {

  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);
  const licenseVersions = getLicenseVersions(metadata.licenses, mandatoryInfo.license);

  /**
   * Update a field
   * 
   * @param {SyntheticEvent} event 
   * @param {string} name 
   */
  const updateField = (event, name) => {
    event.persist();
    
    setMandatoryInfo(() => {
      const value = event.target.value;
      
      const obj = {...mandatoryInfo};
      obj[name] = value;

      if (name === 'license') {
        const versions = getLicenseVersions(metadata.licenses, value);
        obj['licenseVersion'] = versions.length !== 0 ? versions[0].id : '';
      }

      return obj;
    });
  };


  React.useEffect(() => {
    setIsValid(() => {
      if (mandatoryInfo.title === undefined || mandatoryInfo.title.trim().length === 0) {
        return false;
      }
  
      if (!mandatoryInfo.license) {
        return false;
      }
  
      // Check that license version is set for those licenses having a version
      if (licenseVersions.length !== 0 && !mandatoryInfo.licenseVersion) {
        return false;
      }
  
      return true;
    });
  }, [mandatoryInfo, setIsValid, licenseVersions]);

  return (
    <>
      {mandatoryInfo.license}
      <FormElement label={l10n.title} mandatory={true}>
        <input 
          id="title"
          onChange={e => updateField(e, 'title')}
          value={mandatoryInfo.title}/>
      </FormElement>
      <div className='form-element license-row'>
        <div className="license">
          <FormElement 
            label={l10n.license}
            description={l10n.licenseDescription}
            mandatory={true}
          >
            <Dropdown 
              options={metadata.licenses}
              selected={mandatoryInfo.license}
              onChange={e => updateField(e, 'license')}>
            </Dropdown>
          </FormElement>
        </div>
        <div className='license-version'>
          <FormElement
            label={l10n.licenseVersion}
            description={l10n.licenseVersionDescription}
            mandatory={true}
          >
            <Dropdown 
              options={licenseVersions}
              selected={mandatoryInfo.licenseVersion}
              onChange={e => updateField(e, 'licenseVersion')}>
            </Dropdown>
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

Mandatory.propTypes = {
  mandatoryInfo: mandatoryDefinition,
  setMandatoryInfo: PropTypes.func.isRequired
}

export default Mandatory;