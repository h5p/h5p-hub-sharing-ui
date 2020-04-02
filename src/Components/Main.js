import React from 'react';
import Button from './Generic/Button/Button';
import Stepper from './Generic/Stepper/Stepper';
import Step from './Generic/Stepper/Step';

import './Main.scss';
import Mandatory from './Steps/Mandatory';
import Optional from './Steps/Optional';
import Review from './Steps/Review';

const steps = [
  {
    title: 'Required Info',
    content: <Mandatory />,
    nextButton: 'Next'
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

function Main() {
  const [activeStep, setActiveStep] = React.useState(0);
  
  const step = steps[activeStep];


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
          Cancel
        </Button> 
      </div>

      <div className="content">
        <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={index} label={step.title}/>
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
