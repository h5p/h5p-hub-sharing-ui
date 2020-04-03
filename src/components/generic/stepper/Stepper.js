import React from 'react';
import PropTypes from 'prop-types';

import './Stepper.scss';

const StepConnector = () => {
  return (
    <span className="step-connector">
      <span className="step-connector-line"></span>
    </span>
  );
}

const Stepper = ({activeStep, children, completed}) => {
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const state = {
      index,
      active: false,
      completed: completed || false
    };

    if (activeStep === index) {
      state.active = true;
    }
    else if (activeStep > index) {
      state.completed = true;
    }

    return [
      index > 0 ? <StepConnector key={`connector-${index}`}/> : null,
      React.cloneElement(step, { key: `step-${index}`, ...state,  ...step.props})
    ];
  });

  return (
    <div className="stepper" aria-hidden={true}>
      {steps}
    </div>
  );
};

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
  completed: PropTypes.bool
};

export default Stepper;