import React from 'react';
import PropTypes from 'prop-types';

import './Step.scss';

const Step = ({active, label, index, completed}) => {

  let classes = ['h5p-hub-step'];
  if (active) {
    classes.push('h5p-hub-active');
  }
  if (completed) {
    classes.push('h5p-hub-completed');
  }

  return (
    <div className={classes.join(' ')}>
      <div className="h5p-hub-step-icon">
        {
          completed ? 
          <i className="h5p-hub-icon-check"/> :
          index+1
        }
      </div>
      <div className="h5p-hub-step-label">{label}</div>
    </div>
  );
};

Step.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  completed: PropTypes.bool
};

export default Step;