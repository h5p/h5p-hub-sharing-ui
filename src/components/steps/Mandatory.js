import React, { useContext, useState } from 'react';
import FormElement from '../generic/form/Element';
import Dropdown from '../generic/dropdown/Dropdown';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import PropTypes from 'prop-types';
import { replace, mandatoryDefinition } from '../../utils/helpers';
import Modal from '../generic/modal/Modal';
import DisciplineSelector from '../generic/discipline/DisciplineSelector';
import Tip from '../generic/tip/Tip';
import Message from '../generic/message/Message';
import ModalContent from './ModalContent';

const Mandatory = ({ mandatoryInfo, setMandatoryInfo, setIsValid }) => {
  const [showLicenseWarning, setShowLicenseWarning] = useState(false);
  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);
  const license = metadata.getLicense(mandatoryInfo.license);
  const licenseVersions = license ? license.versions : [];
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalCloseButtonRef = React.createRef();
  const [titleFocus, setTitleFocus] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});
  
  const MAX_TITLE_LENGTH = 255;
  const MAX_DISCIPLINES = 10;

  /**
   * Update a field
   *
   * @param {string} value
   * @param {string} name
   */
  const setInfo = (value, name) => {
    setMandatoryInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  React.useEffect(() => {

    const licenseOk = mandatoryInfo.license &&
      (licenseVersions.length === 0 || mandatoryInfo.licenseVersion.length !== 0);

    setIsValid(() => (
      mandatoryInfo.title !== undefined &&
      mandatoryInfo.title.trim().length !== 0 &&
      licenseOk &&
      mandatoryInfo.level.length !== 0 &&
      mandatoryInfo.language.length !== 0 &&
      mandatoryInfo.disciplines.length > 0 &&
      mandatoryInfo.disciplines.length <= 10
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

  /**
   * Intercept the setting of selected disciplines in order to detect if the
   * limit has been reached, and if so, update fieldErrors state variable.
   * 
   * Assumes that the order of items in the checked parameter is the order of
   * selection, meaning that the last item in the array is the one where we
   * want to display an error message, indicating that the checkbox did not get
   * selected.
   * 
   * @param {string[]} checked 
   */
  const handleSetDisciplines = (checked) => {
    if (checked.length <= MAX_DISCIPLINES) {
      setInfo(checked, 'disciplines')
      setFieldErrors((prevState) => { 
        delete prevState.disciplines;
        return prevState;
      });
    }
    else {
      const lastSelectedDiscipline = [...checked].pop();
      setFieldErrors((prevState) => ({
        ...prevState,
        disciplines: {
          [lastSelectedDiscipline]: replace(l10n.disciplineLimitReachedMessage, { ':numDisciplines': MAX_DISCIPLINES })
        }
      }));
    }
  };

  return (
    <>
      <Modal isOpen={modalOpen} closeModal={() => toggleLicense(false)} onAfterOpen={onModalOpen}>
        <ModalContent closeModal={() => toggleLicense(false)} ref={modalCloseButtonRef}/>
      </Modal>

      <FormElement label={l10n.title} mandatory={true}>
        <input
          id="h5p-hub-title"
          onChange={e => setInfo(e.target.value, 'title')}
          value={mandatoryInfo.title}
          maxLength={MAX_TITLE_LENGTH}
          onFocus={() => setTitleFocus(true)}
          onBlur={() => setTitleFocus(false)}/>
      </FormElement>
      <Tip
        text={replace(l10n.maxLength, { ':length': MAX_TITLE_LENGTH })}
        open={mandatoryInfo.title.length === MAX_TITLE_LENGTH && titleFocus}
        className='h5p-hub-tip-text-field'/>
      {
        showLicenseWarning && mandatoryInfo.license &&
        <Message severity="warning">
          {replace(l10n.subContentWarning, {
            ':license': metadata.getLicenseForHumans(mandatoryInfo.license, mandatoryInfo.licenseVersion)
          })}
        </Message>
      }
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
            selected={mandatoryInfo.license || 'U'}
            allowNone={false}
            onChange={e => setInfo(e.target.value, 'license')}/>
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
            onChange={e => setInfo(e.target.value, 'licenseVersion')} />
        </FormElement>
      </div>
      <div className='h5p-hub-row'>
        <FormElement label={l10n.language} mandatory={true}>
          <Dropdown
            options={metadata.languages}
            onChange={(e) => setInfo(e.target.value, 'language')}
            selected={mandatoryInfo.language}
            allowNone={true} />
        </FormElement>

        <FormElement label={l10n.level} mandatory={true}>
          <Dropdown
            options={metadata.levels}
            onChange={(e) => setInfo(e.target.value, 'level')}
            selected={mandatoryInfo.level}
            allowNone={true}/>
        </FormElement>
      </div>
      <FormElement
        label={l10n.disciplineLabel}
        description={l10n.disciplineDescription}
        mandatory={true}
      >
        <DisciplineSelector
          disciplines={mandatoryInfo.disciplines}
          errors={fieldErrors.disciplines}
          setDisciplines={handleSetDisciplines}/>
      </FormElement>
    </>
  );
};

Mandatory.propTypes = {
  mandatoryInfo: mandatoryDefinition,
  setMandatoryInfo: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired
}

export default Mandatory;
