import React from 'react';
import PropTypes from 'prop-types';

import './Element.scss';

const FormElement = ({label, description, mandatory, children, link}) => {
  return (
    <div className={`form-element ${mandatory ? 'mandatory' : ''}`}>
      <label htmlFor={children.props.id}>{label}</label>
      <div className='details-row'>
      {
        description &&
        <div className="description">{description}</div>
      }
      {
        link &&
        <button className='link-button' onClick={link.onClick}>{link.linkText}</button>
      }
      </div>
      {children}
    </div>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  mandatory: PropTypes.bool,
  children: PropTypes.shape(),
  link: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    linkText: PropTypes.string.isRequired
  })
};

export default FormElement;