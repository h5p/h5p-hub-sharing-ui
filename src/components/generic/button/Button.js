import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = (props) => {

  const {
    children,
    name,
    onClick,
    variant,
    color,
    enabled,
    id,
    ref,
    onBlur,
    onFocus,
    ariaLabel,
    onKeyDown,
    position
  } = props

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
  if (position) {
    classes.push(`btn--${position}`)
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
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ]).isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
  id: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  ariaLabel: PropTypes.string,
  onKeyDown: PropTypes.func,
  position: PropTypes.string
};

Button.defaultProps = {
  name: '',
  onClick: null,
  onBlur: null,
  onFocus: null,
  variant: '',
  color: '',
  enabled: true,
  id: '',
  ref: null,
  ariaLabel: '',
  onKeyDown: null,
  position: ''
}

export default Button;