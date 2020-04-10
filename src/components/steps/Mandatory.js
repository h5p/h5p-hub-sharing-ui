import React, { useContext, useState } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import PropTypes from 'prop-types';
import { replace, mandatoryDefinition } from '../../utils/helpers';
import Modal from '../generic/modal/Modal';

import './Mandatory.scss';
import Message from '../generic/message/Message';
import ModalContent from './ModalContent';

const Mandatory = ({ mandatoryInfo, setMandatoryInfo, setIsValid }) => {
  const [showLicenseWarning, setShowLicenseWarning] = useState(false);
  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);
  const license = metadata.getLicense(mandatoryInfo.license);
  const licenseVersions = license ? license.versions : [];
  const [modalOpen, setModalOpen] = React.useState(false);

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

  const toggleLicense = (open) => {
    setModalOpen(open)
  }

  return (
    <>
      <Modal isOpen={modalOpen} closeModal={() => toggleLicense(false)} parent='.h5p-hub-publish'>
        <ModalContent closeModal={() => toggleLicense(false)}/>
      </Modal>

      <FormElement label={l10n.title} mandatory={true}>
        <input
          id="title"
          onChange={e => setInfo(e.target.value, 'title')}
          value={mandatoryInfo.title} />
      </FormElement>
      {
        showLicenseWarning &&
        <Message severity="warning">
          {replace(l10n.subContentWarning, {
            ':license': metadata.getLicenseForHumans(mandatoryInfo.license, mandatoryInfo.licenseVersion)
          })}
        </Message>
      }
      <div className='form-element license-row'>
        <div className="license">
          <FormElement
            label={l10n.license}
            description={l10n.licenseDescription}
            mandatory={true}
            link={{
              linkText: l10n.helpChoosingLicense,
              onClick: () => toggleLicense(true)
            }}
          >
            <div>
            <Dropdown
              options={metadata.licenses}
              selected={mandatoryInfo.license}
              allowNone={true}
              onChange={e => setInfo(e.target.value, 'license')}>
            </Dropdown>
              </div>
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
              allowNone={true}
              onChange={e => setInfo(e.target.value, 'licenseVersion')}>
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