import React, { useContext } from 'react';
import Button from './generic/button/Button';
import Stepper from './generic/stepper/Stepper';
import Step from './generic/stepper/Step';
import Mandatory from './steps/Mandatory';
import Optional from './steps/Optional';
import Review from './steps/Review';
import TranslationContext from '../context/Translation';
import MetadataContext from '../context/Metadata';

import 'normalize.css';
import './Main.scss';



function Main() {
  const [activeStep, setActiveStep] = React.useState(0);
  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);

  const mandatoryDefaultValues = { license: metadata.licenses[0].id };
  const [mandatoryInfo, setMandatoryInfo] = React.useState(mandatoryDefaultValues);

  const steps = [
    {
      title: 'Required Info',
      content: <Mandatory setMandatoryInfo={setMandatoryInfo} mandatoryInfo={mandatoryInfo} />,
      nextButton: 'Next',
    },
    {
      title: 'Optional Info',
      content: <Optional />,
      nextButton: 'Review Info'
    },
    {
      title: 'Review & Share',
      content: <Review />,
      nextButton: 'Share'
    },
  ];

  const step = steps[activeStep];
  console.log(metadata);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="h5p-hub-publish">

      <div className="header">
        <div className="title">Sharing <strong>Norwegian Language Course</strong></div>
        <Button variant="outlined" color="primary">
          {l10n.cancel}
        </Button>
      </div>

      <div className="content">
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index} label={step.title} />
            );
          })}
        </Stepper>

        <div className="step-content">
          {step.content}
        </div>

        <div className="footer">
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>

          <div className="sharing-note">
            (i) All content details can be edited after sharing
          </div>

          <Button variant="outlined" onClick={handleNext}>
            {step.nextButton}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Main;
