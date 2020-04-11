import React, { useContext } from 'react';
import Button from './generic/button/Button';
import Stepper from './generic/stepper/Stepper';
import Step from './generic/stepper/Step';
import Mandatory from './steps/Mandatory';
import Optional from './steps/Optional';
import Review from './steps/Review';
import Success from './steps/Success';
import TranslationContext from '../context/Translation';
import { replace, publishToHub } from '../utils/helpers';

import 'normalize.css';
import './Main.scss';

/**
 * Creates the defintion of the steps in the wizard
 * 
 * @param {bool} shared Is this shared yet?
 */

const getSteps = (shared, mandatory, optional, isValid) => {
  let steps = [
    {
      title: 'requiredInfo',
      content: <Mandatory mandatoryInfo={mandatory.info} setMandatoryInfo={mandatory.setter} setIsValid={isValid}/>,
      nextButton: {
        label: 'next',
        variant: 'outlined'
      },
      backButton: false,
      id: 'mandatory'
    },
    {
      title: 'optionalInfo',
      content: <Optional optionalInfo={optional.info} setOptionalInfo={optional.setter}/>,
      nextButton: {
        label: 'reviewInfo',
        variant: 'outlined'
      },
      backButton: true,
      id: 'optional'
    }
  ];

  steps.push(!shared ? {
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
  } : {
      // Special case - last step done
      title: 'reviewAndShare',
      content: <Success title={mandatory.info.title} contentType='Interactive video'/>, //TODO add real content type
      id: 'success'
    });

  return steps;
};

const defaultImage = {
  src: ''
};

function Main({publishURL}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isShared, setShared] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const defaultOptional = {keywords: [], icon: defaultImage, screenshots:[defaultImage,defaultImage,defaultImage,defaultImage,defaultImage]};
  const [optionalInfo, setOptionalInfo] = React.useState(defaultOptional);
  const l10n = useContext(TranslationContext);
  const mandatoryDefaultValues = {
    license: '',
    language: 'en',
    level: '',
    licenseVersion: '',
    title: '',
    disciplines: []
  };
  const [mandatoryInfo, setMandatoryInfo] = React.useState(mandatoryDefaultValues);

  const steps = getSteps(isShared, {
    info: mandatoryInfo,
    setter: setMandatoryInfo
  }, {
    info: optionalInfo,
    setter: setOptionalInfo
  }, setIsValid);

  const step = steps[activeStep];

  /**
   * Handle next button is clicked
   */
  const handleNext = () => {
    if (activeStep === 2) {
      publishToHub(publishURL, {...mandatoryInfo, ...optionalInfo}, () => {
        setShared(true);
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

  /**
   * Handle cancel button is clicked
   */
  const handleCancel = () => {
    // TODO - Implementation needs to be figured out when
    // integrated into plugins
  };

  const mainTitle = replace(l10n.mainTitle, {':title': 'Norwegian Language Course'});

  return (
    <div className="h5p-hub-publish">
      <div className="header">
        <div
          role="heading"
          className="title"
          dangerouslySetInnerHTML={{__html: mainTitle}} />
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          {l10n.cancel}
        </Button>
      </div>

      <div className="content">
        {!isShared &&
          <Stepper activeStep={activeStep} completed={isShared} showSteps={!isShared}>
            {steps.map((step, index) => {
              return (
                <Step key={index} index={index} label={l10n[step.title]} />
              );
            })}
          </Stepper>
        }

        <div className="step-panel">
          <div className="step-title" role="heading">
            <span className="sr-only">{replace(l10n.currentStep, { ':step': activeStep + 1, ':total': 3 })}</span>
            {l10n[step.title]}
          </div>
          <div className={`step-content ${step.id}`}>
            {step.content}
          </div>
        </div>

        { 
          !isShared &&
          <div className="footer">
            <div className="navigation">
              { 
                step.backButton &&
                <Button name="back" variant="outlined" color="green" onClick={handleBack}>
                  {l10n.back}
                </Button>
              }
              {
                step.nextButton &&
                <Button name="next" variant={step.nextButton.variant} color="green" onClick={handleNext} enabled={isValid}>
                  {l10n[step.nextButton.label]}
                </Button>
              }
            </div>
            <div className="sharing-note">
              <i className="icon-info"/>{l10n.sharingNote}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Main;
