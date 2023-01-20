import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({children, name, onClick, variant, color, enabled, id, ref}) => {

  let classes = ['btn'];

  if (name) {
    classes.push('h5p-hub-' + name)
  }
  if (color) {
    classes.push(`btn--${color}`);
  }
  if (variant) {
    classes.push(`btn--${variant}`);
  }

  return (
    <button 
      id={id} 
      ref={ref}
      type="button" 
      role={'button'}
      className={classes.length > 0 ? classes.join(' ') : null} 
      onClick={onClick} 
      disabled={enabled === false}
    >
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
  id: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default Button;