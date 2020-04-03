import React from 'react';
import PropTypes from 'prop-types';

import './Step.scss';

const Step = ({active, label, index, completed}) => {

  let classes = ['step'];
  if (active) {
    classes.push('active');
  }
  if (completed) {
    classes.push('completed');
  }

  return (
    <div className={classes.join(' ')}>
      <div className="step-icon">
        {
          completed ? 
          <i className="icon-check"/> : 
          index+1
        }
      </div>
      <div className="step-label">{label}</div>
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