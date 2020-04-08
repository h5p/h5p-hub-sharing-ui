import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({children, name, onClick, variant, color, enabled}) => {

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
    <button type="button" className={classes.join(' ')} onClick={onClick} disabled={enabled === false}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
};

export default Button;