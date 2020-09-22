import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({children, name, onClick, variant, color, enabled, id}) => {

  let classes = [];

  if (name) {
    classes.push('h5p-hub-' + name);
  }
  if (variant) {
    classes.push('h5p-hub-' + variant);
  }
  if (color) {
    classes.push('h5p-hub-' + color);
  }

  return (
    <button id={id} type="button" className={classes.join(' ')} onClick={onClick} disabled={enabled === false}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
  id: PropTypes.string
};

export default Button;