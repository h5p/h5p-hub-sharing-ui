import React, { useContext, useState } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import PropTypes from 'prop-types';
import {replace, mandatoryDefinition} from '../../utils/helpers';

import Message from '../generic/message/Message';

const Mandatory = ({ mandatoryInfo, setMandatoryInfo, setIsValid }) => {
  const [showLicenseWarning, setShowLicenseWarning] = useState(false);
  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);
  const license = metadata.getLicense(mandatoryInfo.license);
  const licenseVersions = license ? license.versions : [];

  /**
   * Update a field
   * 
   * @param {string} value
   * @param {string} name 
   */
  const setInfo = (value, name) => {
    setMandatoryInfo(() => ({
      ...mandatoryInfo,
      [name]: value
    }));
  };

  React.useEffect(() => {

    const licenseOk = mandatoryInfo.license && 
      (licenseVersions.length === 0 || mandatoryInfo.licenseVersion.length !== 0);

    setIsValid(() => {
      if (mandatoryInfo.title === undefined || mandatoryInfo.title.trim().length === 0) {
        return false;
      }
  
      if (!licenseOk) {
        return false;
      }
  
      return true;
    });

    setShowLicenseWarning(() => licenseOk);
  }, [mandatoryInfo, setIsValid, licenseVersions]);

  return (
    <>
      <FormElement label={l10n.title} mandatory={true}>
        <input 
          id="title"
          onChange={e => setInfo(e.target.value, 'title')}
          value={mandatoryInfo.title}/>
      </FormElement>
      {
        showLicenseWarning &&
        <Message severity="warning">
          {replace(l10n.subContentWarning, {
            ':license': metadata.getLicenseForHumans(mandatoryInfo.license, mandatoryInfo.licenseVersion)
          })}
        </Message>
      }
      <div className='form-element row dropdowns'>
        <div className="dropdown-element-wrapper">
          <FormElement 
            label={l10n.license}
            description={l10n.licenseDescription}
            mandatory={true}
          >
            <Dropdown 
              options={metadata.licenses}
              selected={mandatoryInfo.license}
              allowNone={true}
              onChange={e => setInfo(e.target.value, 'license')}/>
          </FormElement>
        </div>
        <div className='dropdown-element-wrapper'>
          <FormElement
            label={l10n.licenseVersion}
            description={l10n.licenseVersionDescription}
            mandatory={true}
          >
            <Dropdown
              options={licenseVersions}
              selected={mandatoryInfo.licenseVersion}
              allowNone={true}
              onChange={e => setInfo(e.target.value, 'licenseVersion')} />
          </FormElement>
        </div>
      </div>
      <div className='form-element row dropdowns'>
        <div className='dropdown-element-wrapper'>
          <FormElement label={l10n.language} mandatory={true}>
            <Dropdown
              options={metadata.languages}
              onChange={(e) => setInfo(e.target.value, 'language')}
              selected={mandatoryInfo.language} />
          </FormElement>
        </div>
        <div className='dropdown-element-wrapper'>
          <FormElement label={l10n.level} mandatory={true}>
            <Dropdown
              options={metadata.levels}
              onChange={(e) => setInfo(e.target.value, 'level')}
              selected={mandatoryInfo.level}
              allowNone={true}/>
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