import React from 'react';

import './Stepper.scss';

const StepConnector = () => {
  return (
    <span className="step-connector">
      <span className="step-connector-line"></span>
    </span>
  );
}

const Stepper = ({activeStep, children}) => {

  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const controlProps = {
      last: index + 1 === childrenArray.length
    };

    const state = {
      index,
      active: false,
      completed: false,
      disabled: false,
    };

    if (activeStep === index) {
      state.active = true;
    }
    else if (activeStep > index) {
      state.completed = true;
    }
    else if (activeStep < index) {
      state.disabled = true;
    }

    return [
      index > 0 ? <StepConnector /> : null,
      React.cloneElement(step, { ...controlProps, ...state, ...step.props })
    ];
  });


  return (
    <div className="stepper">
      {steps}
    </div>
  );
};

export default Stepper;