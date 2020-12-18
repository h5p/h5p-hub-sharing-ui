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
  postUrl,
  redirectUrl,
  accountSettingsUrl,
  token,
  accountInfo,
}) => {
  const l10n = useContext(TranslationContext);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [shareState, setShareState] = useState('');
  const shareFailedRef = React.useRef(null);
  const [shareFailedMessage, setShareFailedMessage] = useState(null);
  const shareFinishedRef = React.useRef(null);

  const [fields, setFields] = useState({
    publisher: accountInfo.name || '',
    emailAddress: accountInfo.email || '',
    publisherDescription: accountInfo.description || '',
    contactPerson: accountInfo.contactPerson || '',
    phone: accountInfo.phone || '',
    address: accountInfo.address || '',
    city: accountInfo.city || '',
    zip: accountInfo.zip || '',
    country: accountInfo.country || '',
    logo: {
      src: accountInfo.logo,
    },
    removeLogo: false,
  });
  const isRegistered = accountInfo.name && accountInfo.name.length > 0;

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
    registerToHub(postUrl, token, fields, (response) => {
      if (response.data && response.data.success) {
        if (redirectUrl) {
          // Redirect to new page instead of showing success message
          window.location.assign(redirectUrl);
          return;
        }

        setShareState('finished');
        setShareFailedMessage(null);
        if (shareFinishedRef.current) {
          shareFinishedRef.current.focus();
        }
      }
      else {
        let msg = (response.data && response.data.message) || null;
        setShareFailedMessage(msg);
        setShareState('failed');
        if (shareFailedRef.current) {
          shareFailedRef.current.focus();
        }
      }
    }, (error) => {
      setShareState('failed');
      let message = (
        error.response
        && error.response.data
        && error.response.data.message
      ) || null;
      setShareFailedMessage(message);
      if (shareFailedRef.current) {
        shareFailedRef.current.focus();
      }
    });
  }

  return (
    <div className='h5p-hub-registration'>
      {shareState === 'failed' &&
        <Message severity='error'>
          <div className='h5p-hub-message-header' tabIndex="-1" ref={shareFailedRef}>{l10n.registrationFailed}</div>
          <div className='h5p-hub-message-description'>
            {shareFailedMessage || l10n.registrationFailedDescription}
          </div>
        </Message>
      }
      {shareState === 'finished' ?
        <Message severity='success'>
          <div className='h5p-hub-message-header' tabIndex="-1" ref={shareFinishedRef}>
            {isRegistered ? l10n.successfullyUpdated : l10n.successfullyRegistred}
          </div>
          <div className='h5p-hub-message-description'>
            {l10n.successfullyRegistredDescription}
            <a href={accountSettingsUrl}>{l10n.accountDetailsLinkText}</a>
          </div>
        </Message>
        :
        <div className='h5p-hub-registration-wrapper'>
          <div className="h5p-hub-step-panel">
            <div className="h5p-hub-step-title" role="heading">
              {l10n.registrationTitle}
            </div>
            <div className={`h5p-hub-step-content`}>
              <FormElement label={l10n.publisherFieldTitle}
                           mandatory={true}
                           description={l10n.publisherFieldDescription}>
                <input
                  id="h5p-hub-form-publisher"
                  onChange={e => setInfo(e.target.value, 'publisher')}
                  value={fields.publisher}/>
              </FormElement>
              <FormElement label={l10n.emailAddress}
                           description={l10n.emailAddressDescription}
                           mandatory={true}
                           className='h5p-hub-email-address'>
                <input
                  id="h5p-hub-form-email-address"
                  onChange={e => setInfo(e.target.value, 'emailAddress')}
                  value={fields.emailAddress}
                />
              </FormElement>
              <FormElement label={l10n.publisherDescription} description={l10n.publisherDescriptionText} mandatory={false}>
                <textarea
                  value={fields.publisherDescription}
                  id="h5p-hub-form-publisher-description"
                  placeholder=''
                  onChange={(event) => setInfo(event.target.value, 'publisherDescription')}
                  className='h5p-hub-publisher-description' />
              </FormElement>
              <FormElement label={l10n.contactPerson} description={l10n.contactPersonDescription} mandatory={false}>
                <input
                  id="h5p-hub-form-contact-person"
                  onChange={e => setInfo(e.target.value, 'contactPerson')}
                  value={fields.contactPerson} />
              </FormElement>

              <div className="h5p-hub-row">
                <FormElement label={l10n.phone} mandatory={false}>
                  <input
                    id="h5p-hub-form-phone"
                    onChange={e => setInfo(e.target.value, 'phone')}
                    value={fields.phone} />
                </FormElement>
                <FormElement label={l10n.address} mandatory={false}>
                  <input
                    id="h5p-hub-form-address"
                    onChange={e => setInfo(e.target.value, 'address')}
                    value={fields.address} />
                </FormElement>
              </div>
              <div className='h5p-hub-row'>
                <FormElement label={l10n.city} mandatory={false}>
                  <input
                    id="h5p-hub-form-city"
                    onChange={e => setInfo(e.target.value, 'city')}
                    value={fields.city} />
                </FormElement>
                <FormElement label={l10n.zip} mandatory={false}>
                  <input
                    id="h5p-hub-form-zip"
                    onChange={e => setInfo(e.target.value, 'zip')}
                    value={fields.zip} />
                </FormElement>
                <FormElement label={l10n.country} mandatory={false}>
                  <input
                    id="h5p-hub-form-country"
                    onChange={e => setInfo(e.target.value, 'country')}
                    value={fields.country} />
                </FormElement>
              </div>
              <div className='h5p-hub-logo-upload-text'>
                {l10n.logoUploadText}
              </div>
              <ImageUpload
                img={fields.logo}
                onFile={img => {
                  setInfo(false, 'removeLogo');
                  setInfo(img, 'logo');
                }}
                clearImage={setInfo.bind(this, true, 'removeLogo')}
                ariaLabel={l10n.logoUploadText}
                removeImageLabel={l10n.removeImage}
              />
              <Checkbox checked={ acceptedTerms } onChange={ setAcceptedTerms }>
                <span dangerouslySetInnerHTML={ {__html: l10n.acceptTerms.replace(':url', 'https://h5p.org/H5P-Hub-terms-of-use')} }/>
              </Checkbox>
            </div>
          </div>
          <div className='h5p-hub-footer'>
            <Button onClick={onCancel}>
              {l10n.cancel}
            </Button>
            <Button
              variant='register-hub'
              onClick={onRegister}
              enabled={isValid && shareState !== 'in-process'}>
              {isRegistered ? l10n.updateRegistrationOnHub : l10n.registerOnHub}
            </Button>
          </div>
        </div>
      }
    </div>
  );
};

Registration.propTypes = {
  postUrl: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
  accountSettingsUrl: PropTypes.string.isRequired,
  accountInfo: PropTypes.object,
}

export default Registration;
