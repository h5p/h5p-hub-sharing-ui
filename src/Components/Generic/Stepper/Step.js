import React from 'react';

import './Step.scss';

const Step = ({active, label, index}) => {
  return (
    <div className={`step ${active ? 'active' : ''}`}>
      <span className="step-icon">{index+1}</span>
      <span className="step-label">{label}</span>
    </div>
  );
};

export default Step;