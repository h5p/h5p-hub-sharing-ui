import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({children, name, onClick, variant, color}) => {

  let classes = [];

  if (name) {
    classes.push(name);
  }
  if (variant) {
    classes.push(variant);
  }
  if (color) {
    classes.push(color);
  }

  return (
    <button type="button" className={classes.join(' ')} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string
};

export default Button;