import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

const Checkbox = ({ checked = false, onChange = null, children = null }) => {

  // Handle keyboard events
  const handleKeyPress = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      onChange(!checked);
      e.preventDefault();
    }
  };

  // Handle checkbox input value changes
  const handleChange = e => {
    onChange(e.target.checked);
  };

  // Determine class for styling
  let className = 'h5p-hub-checkbox';
  if (checked) {
    className += ' h5p-hub-checked';
  }

  // Render
  return (
    <label className={ className } tabIndex="0" onKeyPress={ handleKeyPress }>
      <input type="checkbox" checked={ checked } onChange={ handleChange } />
      <span className="h5p-hub-icon"></span>
      { children }
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
