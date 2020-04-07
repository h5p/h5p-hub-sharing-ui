import React, { useContext } from 'react';
import Button from './generic/button/Button';
import Stepper from './generic/stepper/Stepper';
import Step from './generic/stepper/Step';
import Mandatory from './steps/Mandatory';
import Optional from './steps/Optional';
import Review from './steps/Review';
import Success from './steps/Success';
import TranslationContext from '../context/Translation';
import { replace } from '../utils/helpers';

import 'normalize.css';
import './Main.scss';



const getSteps = (shared, optionalInfo, setOptionalInfo) => {
  let steps = [
    {
      title: 'requiredInfo',
      content: <Mandatory />,
      nextButton: {
        label: 'next',
        variant: 'outlined'
      },
      backButton: false,
      id: 'mandatory'
    },
    {
      title: 'optionalInfo',
      content: <Optional optionalInfo={optionalInfo} setOptionalInfo={setOptionalInfo}/>,
      nextButton: {
        label: 'reviewInfo',
        variant: 'outlined'
      },
      backButton: true,
      id: 'optional'
    }
  ]

  steps.push(!shared ? {
    title: 'reviewAndShare',
    content: <Review 
      title='Test title'
      license='license'
      disciplines={['One descipline', 'Another discipline']}
      keywords={['keywordA', 'Another keyword']}
      shortDescription='A short description'
      longDescription='A long description'
      icon={{}}
      screenshots={[{},{},{},{},{}]}
    />,
    nextButton: {
      label: 'share',
      variant: 'contained'
    },
    backButton: true,
    id: 'review',
  } : {
    // Special case - last step done
    title: 'shared',
    content: <Success />,
    id: 'success'
  });

  return steps;
};

function Main() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isShared, setShared] = React.useState(false);
  const defaultOptional = {keywords: []}
  const [optionalInfo, setOptionalInfo] = React.useState(defaultOptional);
  const l10n = useContext(TranslationContext);
  const steps = getSteps(isShared, optionalInfo, setOptionalInfo);
  const step = steps[activeStep];

  /**
   * Handle next button is clicked
   */
  const handleNext = () => {
    if (activeStep === 2) {
      setShared(true);
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

  const handleCancel = () => {
    console.log('Cancel');
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
        <Stepper activeStep={activeStep} completed={isShared}>
        {steps.map((step, index) => {
          return (
            <Step key={index} index={index} label={l10n[step.title]} />
          );
        })}
        </Stepper>

        <div className="step-panel">
          {
            !isShared &&
            <div className="step-title" role="heading">
              <span className="sr-only">{replace(l10n.currentStep, {':step': activeStep+1, ':total': 3})}</span>
              {l10n[step.title]}
            </div>
          }
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
                <Button name="next" variant={step.nextButton.variant} color="green" onClick={handleNext}>
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
