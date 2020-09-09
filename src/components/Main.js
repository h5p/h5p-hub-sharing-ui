import React, { useContext } from 'react';
import Button from './generic/button/Button';
import Stepper from './generic/stepper/Stepper';
import Step from './generic/stepper/Step';
import Mandatory from './steps/Mandatory';
import Optional from './steps/Optional';
import Review from './steps/Review';
import Success from './steps/Success';
import Message from './generic/message/Message';
import TranslationContext from '../context/Translation';
import { replace, publishToHub } from '../utils/helpers';
import PropTypes from 'prop-types';

import 'normalize.css';
import './Main.scss';

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

function Main({ title, publishURL, contentType, language, token, hubContent = {}}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isShared, setShared] = React.useState(false);
  const [shareFailed, setShareFailed] = React.useState(false);
  const [shareInProcess, setShareInProcess] = React.useState(false);
  const [mandatoryIsValid, setMandatoryIsValid] = React.useState(false);
  const [optionalIsValid, setOptionalIsValid] = React.useState(false);
  const [optionalInfo, setOptionalInfo] = React.useState({
    shortDescription:  hubContent.summary || '',
    longDescription:  hubContent.description || '',
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
    if (activeStep === 2) {
      setShareInProcess(true);
      publishToHub(publishURL, token, { ...mandatoryInfo, ...optionalInfo }, () => {
        setShared(true);
        setShareInProcess(false);
      }, () => {
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
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const mainTitle = replace(l10n.mainTitle, { ':title': title });

  const nextButtonEnabled = activeStep === 2 || (activeStep === 0 && mandatoryIsValid) || (activeStep === 1 && optionalIsValid);

  return (
    <div className="h5p-hub-publish">
      <div id='h5p-hub-publish-modal-wrapper'>
        <div className="header">
          <div
            role="heading"
            className="title"
            dangerouslySetInnerHTML={{ __html: mainTitle }} />
        </div>

        <div className="content">
          {!isShared ?
            <>
              <Stepper activeStep={activeStep} completed={isShared} showSteps={!isShared}>
                {steps.map((step, index) => {
                  return (
                    <Step key={index} index={index} label={l10n[step.title]} />
                  );
                })}
              </Stepper>

              <div className="step-panel">
                <div className="step-title" role="heading">
                  <span className="sr-only">{replace(l10n.currentStep, { ':step': activeStep + 1, ':total': 3 })}</span>
                  {l10n[step.title]}
                </div>
                <div className={`step-content ${step.id}`}>
                  {step.content}
                </div>
              </div>
              {shareFailed &&
                <div className='share-error'>
                  <Message severity='error'><span className='bold'>{l10n.shareFailed}</span> {l10n.shareTryAgain}</Message>
                </div>
              }
              <div className="footer">
                <div className="navigation">
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
                      color="green" onClick={handleNext}
                      enabled={nextButtonEnabled && !shareInProcess}
                      id={shareInProcess ? 'share-in-process' : ''}>
                      {!shareInProcess ? l10n[step.nextButton.label]
                        : <span>{l10n.pleaseWait}</span>
                      }
                    </Button>
                  }
                </div>
                <div className="sharing-note">
                  <i className="icon-info" />{l10n.sharingNote}
                </div>
              </div>
            </>
            :
            // Success page
            <>
              <div className="step-title" role="heading">
                {l10n.reviewAndShare}
              </div>
              <div className={`step-content`}>
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
  contentType: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}

export default Main;
