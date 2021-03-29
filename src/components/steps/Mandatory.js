import React, { useContext, useState } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import PropTypes from 'prop-types';
import { replace, mandatoryDefinition } from '../../utils/helpers';
import Modal from '../generic/modal/Modal';
import Tip from '../generic/tip/Tip';
import ModalContent from './ModalContent';

const Mandatory = ({ mandatoryInfo, setMandatoryInfo, setIsValid, clearMessages }) => {
  const [showLicenseWarning, setShowLicenseWarning] = useState(false);
  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);
  const license = metadata.getLicense(mandatoryInfo.license);
  const licenseVersions = license ? license.versions : [];
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalCloseButtonRef = React.createRef();
  const [titleFocus, setTitleFocus] = React.useState(false);

  const MAX_TITLE_LENGTH = 255;

  /**
   * Update a field
   *
   * @param {string} value
   * @param {string} name
   */
  const setInfo = (value, name) => {

    // Hack to clear license version when license changes
    let clearLicenseVersion = false;
    if (name === 'license') {
      const license = metadata.getLicense(value);
      if (!license || !license.versions || !license.versions.length) {
        clearLicenseVersion = true;
      }
    }

    setMandatoryInfo(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      if (clearLicenseVersion) {
        newState['licenseVersion'] = '';
      }
      return newState;
    });
    
  };

  React.useEffect(() => {

    const licenseOk = mandatoryInfo.license &&
      (licenseVersions.length === 0 || mandatoryInfo.licenseVersion.length !== 0);

    setIsValid(() => (
      mandatoryInfo.title !== undefined &&
      mandatoryInfo.title.trim().length !== 0 &&
      licenseOk &&
      mandatoryInfo.language.length !== 0
    ));

    setShowLicenseWarning(() => licenseOk);
  }, [mandatoryInfo, setIsValid, licenseVersions]);

  const toggleLicense = (open) => {
    setModalOpen(open)
  }

  /**
   * Set focus to close button when modal open
   */
  const onModalOpen = () => {
    if(modalCloseButtonRef.current) {
      modalCloseButtonRef.current.focus();
    }
  }

  const setLicense = (e) => {
    setInfo(e.target.value, 'license')
    clearMessages();
  }

  return (
    <>
      <Modal isOpen={modalOpen} closeModal={() => toggleLicense(false)} onAfterOpen={onModalOpen}>
        <ModalContent closeModal={() => toggleLicense(false)} ref={modalCloseButtonRef}/>
      </Modal>
      <div className="h5p-hub-row">
        <FormElement label={l10n.title} mandatory={true}>
          <input
            id="h5p-hub-form-title"
            onChange={e => setInfo(e.target.value, 'title')}
            value={mandatoryInfo.title}
            maxLength={MAX_TITLE_LENGTH}
            onFocus={() => setTitleFocus(true)}
            onBlur={() => setTitleFocus(false)}/>
        </FormElement>
        <Tip
          text={replace(l10n.maxLength, {':length': MAX_TITLE_LENGTH})}
          open={mandatoryInfo.title.length === MAX_TITLE_LENGTH && titleFocus}
          className='h5p-hub-tip-text-field'
        />
        <FormElement label={l10n.language} mandatory={true}>
          <Dropdown
            options={metadata.languages}
            onChange={(e) => setInfo(e.target.value, 'language')}
            selected={mandatoryInfo.language}
            allowNone={true}
            id='h5p-hub-form-language'/>
        </FormElement>
      </div>
      <div className='h5p-hub-row'>
        <FormElement
          label={l10n.license}
          description={l10n.licenseDescription}
          mandatory={true}
          link={{
            linkText: l10n.licenseDetails,
            onClick: () => toggleLicense(true)
          }}
        >
          <Dropdown
            options={metadata.licenses}
            selected={mandatoryInfo.license || ''}
            allowNone={true}
            onChange={setLicense}
            id='h5p-hub-form-license'/>
        </FormElement>
        <FormElement
          label={l10n.licenseVersion}
          description={l10n.licenseVersionDescription}
          mandatory={true}
        >
          <Dropdown
            options={licenseVersions}
            selected={mandatoryInfo.licenseVersion}
            allowNone={true}
            onChange={e => setInfo(e.target.value, 'licenseVersion')}
            id='h5p-hub-form-license-version'/>
        </FormElement>
      </div>
    </>
  );
};

Mandatory.propTypes = {
  mandatoryInfo: mandatoryDefinition,
  setMandatoryInfo: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
}

export default Mandatory;
