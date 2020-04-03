import React, { useContext } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import './Mandatory.scss';

const Mandatory = ({ mandatoryInfo, setMandatoryInfo }) => {

  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);

  const setLicense = (event) => {
    event.persist()
    setMandatoryInfo(() => ({
      ...mandatoryInfo,
      license: event.target.value
    }));
  }

  const setLicenseVersion = (event) => {
    event.persist()
    setMandatoryInfo(() => ({
      ...mandatoryInfo,
      licenseVersion: event.target.value
    }));
  }

  const getLicenseVersions = (id) => {
    for (let i = 0; i < metadata.licenses.length; i++) {
      if (metadata.licenses[i].id == id) {
        return metadata.licenses[i].versions;
      }
    }
    return []
  }

  return (
    <>
      <FormElement label="Title" description="Testing description" mandatory={true}>
        <input id="title"></input>
      </FormElement>
      <div className='license-row'>
        <div className="license">
          <FormElement label={l10n.license} description={l10n.licenseDescription}>
            <Dropdown options={metadata.licenses} onChange={setLicense}></Dropdown>
          </FormElement>
        </div>
        <div className='license-version'>
          <FormElement label={l10n.licenseVersion} description={l10n.licenseVersionDescription}>
            <Dropdown options={getLicenseVersions(mandatoryInfo.license)} onChange={setLicenseVersion}></Dropdown>
          </FormElement>
        </div>

      </div>


    </>
  );
};

export default Mandatory;