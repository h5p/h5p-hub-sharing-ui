import React, { useContext, useState } from 'react';
import Button from './generic/button/Button';
import Stepper from './generic/stepper/Stepper';
import Step from './generic/stepper/Step';
import Mandatory from './steps/Mandatory';
import Optional from './steps/Optional';
import Review from './steps/Review';
import Success from './steps/Success';
import Message from './generic/message/Message';
import Modal from './generic/modal/Modal';
import ConfirmationDialog from './generic/confirmation-dialog/ConfirmationDialog';
import TranslationContext from '../context/Translation';
import MetadataContext from '../context/Metadata';
import { replace, publishToHub, getParents, getDisciplinesWithAncestors } from '../utils/helpers';
import PropTypes from 'prop-types';

import 'normalize.css';
import './Main.scss';
import {validateAge} from "../utils/validators";

/**
 * Creates the defintion of the steps in the wizard
 *
 * @param {object} mandatory
 * @param {object} optional
 */
const getSteps = (mandatory, optional) => {
  let steps = [
    {
      title: 'requiredInfo',
      content: <Mandatory
        mandatoryInfo={mandatory.info}
        setMandatoryInfo={mandatory.setter}
        setIsValid={mandatory.setIsValid} />,
      nextButton: {
        label: 'next',
        variant: 'outlined'
      },
      backButton: false,
      id: 'mandatory'
    },
    {
      title: 'optionalInfo',
      content: <Optional
        optionalInfo={optional.info}
        setOptionalInfo={optional.setter}
        setIsValid={optional.setIsValid} />,
      nextButton: {
        label: 'reviewInfo',
        variant: 'outlined'
      },
      validation: (l10n) => {
        const isValid = validateAge(optional.info.age);
        if (!isValid) {
          return {
            msg: l10n.invalidAge,
            success: false,
          };
        }

        return {
          success: true,
        };
      },
      backButton: true,
      id: 'optional'
    },
    {
      title: 'reviewAndShare',
      content: <Review
        mandatoryInfo={mandatory.info}
        optionalInfo={optional.info}
      />,
      nextButton: {
        label: 'share',
        variant: 'contained'
      },
      backButton: true,
      id: 'review',
    }]

  return steps;
};

const defaultImage = {
  src: '',
  alt: ''
};

function Main({ title, publishURL, returnURL, contentType, language, token, hubContent = {} }) {
  const metadata = useContext(MetadataContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isShared, setShared] = React.useState(false);
  const [shareFailed, setShareFailed] = React.useState(false);
  const [shareFailedMessage, setShareFailedMessage] = useState(null);
  const [shareInProcess, setShareInProcess] = React.useState(false);
  const [mandatoryIsValid, setMandatoryIsValid] = React.useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = React.useState(false);
  const [optionalIsValid, setOptionalIsValid] = React.useState(false);
  const [optionalInfo, setOptionalInfo] = React.useState({
    shortDescription:  hubContent.summary || '',
    longDescription:  hubContent.description || '',
    age: hubContent.age || '',
    keywords:  hubContent.keywords || [],
    icon:  hubContent.icon ? {src: hubContent.icon, alt: '', old: true} : defaultImage,
    remove_icon: null,
    screenshots:  hubContent.screenshots ? hubContent.screenshots.map(pat => ({src: pat.path, alt: pat.altText, old: true})) : [defaultImage, defaultImage, defaultImage, defaultImage, defaultImage],
    remove_screenshots: []
  });
  const [mandatoryInfo, setMandatoryInfo] = React.useState({
    license: hubContent.license || '',
    language: hubContent.language || language,
    level: hubContent.level || '',
    licenseVersion:  hubContent.licenseVersion || '',
    title: hubContent.title || title,
    disciplines: hubContent.disciplines || []
  });
  const l10n = useContext(TranslationContext);

  const steps = getSteps({
    info: mandatoryInfo,
    setter: setMandatoryInfo,
    setIsValid: setMandatoryIsValid
  }, {
    info: optionalInfo,
    setter: setOptionalInfo,
    setIsValid: setOptionalIsValid
  });

  const step = steps[activeStep];

  /**
   * Handle next button is clicked
   */
  const handleNext = () => {
    setShareFailed(false);

    // Run validation for step
    if (step.validation) {
      const isValid = step.validation(l10n);
      if (isValid.success === false) {
        // Display error message
        setShareFailed(true);
        setShareFailedMessage(isValid.msg);
        return;
      }
    }

    if (activeStep === 2) {
      setShareInProcess(true);
      //Send disciplines with it's ancestors
      const disciplines = getDisciplinesWithAncestors(mandatoryInfo.disciplines, getParents(metadata.disciplines));
      publishToHub(publishURL, token, { ...mandatoryInfo, disciplines: disciplines, ...optionalInfo }, (response) => {
        const data = response.data;
        if (!data.success) {
          setShareFailedMessage(data.message || null);
          setShareFailed(true);
          setShareInProcess(false);
        }
        else {
          setShared(true);
          setShareInProcess(false);
        }
      }, () => {
        setShareFailedMessage(null);
        setShareFailed(true);
        setShareInProcess(false);
      })
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  /**
   * Handle back button is clicked
   */
  const handleBack = () => {
    setShareFailed(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * Handle cancel button is clicked
   */
  const handleCancel = () => {
    if (isShared && returnURL) {
      window.location.href = returnURL;
      return;
    }

    setShowConfirmationDialog(true);
  };

  /**
   * Cancel the sharing process and navigate back
   */
  const cancelSharing = () => {
    window.history.back();
  };

  const mainTitle = replace(l10n.mainTitle, { ':title': title });

  const nextButtonEnabled = activeStep === 2 || (activeStep === 0 && mandatoryIsValid) || (activeStep === 1 && optionalIsValid);

  return (
    <div className="h5p-hub-publish">
      <div id='h5p-hub-publish-modal-wrapper'>
        <Modal isOpen={showConfirmationDialog} closeModal={() => setShowConfirmationDialog(false)} className="h5p-hub-cancel-publish-confirmation-modal">
          <ConfirmationDialog l10n={l10n} onConfirm={cancelSharing} onCancel={() => setShowConfirmationDialog(false)} />
        </Modal>
        <div className="h5p-hub-header">
          <div
            role="heading"
            className="h5p-hub-title"
            dangerouslySetInnerHTML={{ __html: mainTitle }} />
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            {isShared ? l10n.close : l10n.cancel}
          </Button>
        </div>

        <div className="h5p-hub-content">
          {!isShared ?
            <>
              <Stepper activeStep={activeStep} completed={isShared} showSteps={!isShared}>
                {steps.map((step, index) => {
                  return (
                    <Step key={index} index={index} label={l10n[step.title]} />
                  );
                })}
              </Stepper>

              <div className="h5p-hub-step-panel">
                <div className="h5p-hub-step-title" role="heading">
                  <span className="h5p-hub-sr-only">{replace(l10n.currentStep, { ':step': activeStep + 1, ':total': 3 })}</span>
                  {l10n[step.title]}
                </div>
                <div className={`h5p-hub-step-content h5p-hub-${step.id}`}>
                  {step.content}
                </div>
              </div>
              {shareFailed &&
                <div className='h5p-hub-share-error'>
                  <Message severity='error'>
                    {
                      shareFailedMessage
                      ? <span className='h5p-hub-bold'>{ shareFailedMessage }</span>
                      : <>
                          <span className='h5p-hub-bold'>{ l10n.shareFailed}</span> {l10n.shareTryAgain}
                        </>
                    }
                  </Message>
                </div>
              }
              <div className="h5p-hub-footer">
                <div className="h5p-hub-navigation">
                  {
                    step.backButton &&
                    <Button name="back" variant="outlined" color="green" onClick={handleBack} enabled={!shareInProcess}>
                      {l10n.back}
                    </Button>
                  }
                  {
                    step.nextButton &&
                    <Button
                      name="next"
                      variant={step.nextButton.variant}
                      color="green"
                      onClick={handleNext}
                      enabled={nextButtonEnabled && !shareInProcess}
                      id={shareInProcess ? 'h5p-hub-share-in-process' : ''}>
                      {!shareInProcess ? l10n[step.nextButton.label]
                        : <span>{l10n.pleaseWait}</span>
                      }
                    </Button>
                  }
                </div>
                <div className="h5p-hub-sharing-note">
                  <i className="h5p-hub-icon-info" />{l10n.sharingNote}
                </div>
              </div>
            </>
            :
            // Success page
            <>
              <div className="h5p-hub-step-title" role="heading">
                {l10n.reviewAndShare}
              </div>
              <div className={`h5p-hub-step-content`}>
                <Success title={mandatoryInfo.title} contentType={contentType} />
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

Main.propTypes = {
  title: PropTypes.string.isRequired,
  publishURL: PropTypes.string.isRequired,
  returnURL: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}

export default Main;
