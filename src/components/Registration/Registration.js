import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TranslationContext from '../../context/Translation';
import Button from '../generic/button/Button';
import FormElement from '../generic/form/Element';
import { registerToHub } from '../../utils/helpers';

import 'normalize.css';
import '../Main.scss';
import './Registration.scss';
import ImageUpload from '../generic/form/ImageUpload';
import TextField from '../generic/textField/TextField';
import Checkbox from '../generic/selector/Checkbox/Checkbox';
import Message from '../generic/message/Message';

const Registration = ({
  mainTitle,
  licenseAgreementTitle,
  licenseAgreementDescription,
  licenseAgreementMainText,
  postUrl,
  accountSettingsUrl 
}) => {
  const l10n = useContext(TranslationContext);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [shareState, setShareState] = useState('');
  const shareFailedRef = React.useRef(null);
  const shareFinishedRef = React.useRef(null);

  const [fields, setFields] = useState({
    publisher: '',
    emailAddress: '',
    publisherDescription: '',
    contactPerson: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    logo: {}
  });

  /**
   * Update a field
   * 
   * @param {string} value
   * @param {string} name 
   */
  const setInfo = (value, name) => {
    setFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isValid =
    fields.publisher !== '' &&
    fields.emailAddress !== '' &&
    acceptedTerms;

  /**
   * Go to last page when cancel
   */
  const onCancel = () => {
    window.history.back();
  }

  /**
   * Attempt at registering to the hub and set share in process and failed accordingly
   */
  const onRegister = () => {
    setShareState('in-process');
    registerToHub(postUrl, fields, () => {
      setShareState('failed');
      if(shareFinishedRef.current) {
        scrollIntoView(shareFinishedRef.current)
      }
    }, () => {
      setShareState('finished');
      if(shareFailedRef.current) {
        scrollIntoView(shareFailedRef.current);
      }
    });
  }

  /**
   * Scroll and focus to the element
   * @param  {HTMLElement} element
   */
  const scrollIntoView = (element) => {
    element.focus();
    element.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className='h5p-hub-registration'>
      {shareState === 'failed' &&
        <Message severity='error'>
          <div className='message-header' ref={shareFailedRef}>{l10n.registrationFailed}</div>
          <div className='message-description'>
            {l10n.registrationFailedDescription}</div>
        </Message>
      }
      {shareState === 'finished' ?
        <Message severity='success'>
          <div className='message-header' ref={shareFinishedRef}>{l10n.successfullyRegistred}</div>
          <div className='message-description'>
            {l10n.successfullyRegistredDescription}
            <a href={accountSettingsUrl}>{l10n.accountDetailsLinkText}</a>
          </div>
        </Message>
        :
        <div className='h5p-hub-registration-wrapper'>
          <div className="step-panel">
            <div className="step-title" role="heading">
              {mainTitle}
            </div>
            <div className={`step-content`}>
              <div className='row'>
                <FormElement label={l10n.publisherFieldTitle} mandatory={true} description={l10n.publisherFieldDescription}>
                  <input
                    id="publisher"
                    onChange={e => setInfo(e.target.value, 'publisher')}
                    value={fields.publisher} />
                </FormElement>
                <FormElement label={l10n.emailAddress} mandatory={true} className='email-address'>
                  <input
                    id="email-address"
                    onChange={e => setInfo(e.target.value, 'emailAddress')}
                    value={fields.emailAddress} />
                </FormElement>
              </div>
              <FormElement label={l10n.publisherDescription} description={l10n.publisherDescriptionText} mandatory={false}>
                <textarea
                  value={fields.publisherDescription}
                  id="publisher-description"
                  placeholder=''
                  onChange={(event) => setInfo(event.target.value, 'publisherDescription')}
                  className='publisher-description' />
              </FormElement>
              <div className='row'>
                <FormElement label={l10n.contactPerson} mandatory={false}>
                  <input
                    id="contact-person"
                    onChange={e => setInfo(e.target.value, 'contactPerson')}
                    value={fields.contactPerson} />
                </FormElement>
                <FormElement label={l10n.phone} mandatory={false}>
                  <input
                    id="phone"
                    onChange={e => setInfo(e.target.value, 'phone')}
                    value={fields.phone} />
                </FormElement>
              </div>
              <FormElement label={l10n.address} mandatory={false}>
                <input
                  id="address"
                  onChange={e => setInfo(e.target.value, 'address')}
                  value={fields.address} />
              </FormElement>
              <div className='row'>
                <FormElement label={l10n.city} mandatory={false}>
                  <input
                    id="city"
                    onChange={e => setInfo(e.target.value, 'city')}
                    value={fields.city} />
                </FormElement>
                <FormElement label={l10n.zip} mandatory={false}>
                  <input
                    id="zip"
                    onChange={e => setInfo(e.target.value, 'zip')}
                    value={fields.zip} />
                </FormElement>
                <FormElement label={l10n.country} mandatory={false}>
                  <input
                    id="country"
                    onChange={e => setInfo(e.target.value, 'country')}
                    value={fields.country} />
                </FormElement>
              </div>
              <div className='logo-upload-text'>
                {l10n.logoUploadText}
              </div>
              <ImageUpload
                img={fields.logo}
                onFile={img => setInfo(img, 'logo')}
                ariaLabel={l10n.logoUploadText}
              />
              <TextField
                title={licenseAgreementTitle}
                description={licenseAgreementDescription}
                mainText={licenseAgreementMainText} />
              <Checkbox
                label={l10n.acceptTerms}
                id='accept-terms'
                checked={acceptedTerms}
                filter=''
                onChecked={(name, id, checked) => setAcceptedTerms(checked)} />
            </div>
          </div>
          <div className='footer'>
            <Button onClick={onCancel}>
              {l10n.cancel}
            </Button>
            <Button
              variant='register-hub'
              onClick={onRegister}
              enabled={isValid && shareState !== 'in-process'}>
              {l10n.registerOnHub}
            </Button>
          </div>
        </div>
      }
    </div>
  );
};

Registration.propTypes = {
  mainTitle: PropTypes.string.isRequired,
  licenseAgreementTitle: PropTypes.string.isRequired,
  licenseAgreementDescription: PropTypes.string.isRequired,
  licenseAgreementMainText: PropTypes.string.isRequired,
  postUrl: PropTypes.string.isRequired,
  accountSettingsUrl: PropTypes.string.isRequired
}

export default Registration;
