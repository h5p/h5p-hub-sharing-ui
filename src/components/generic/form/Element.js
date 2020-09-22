import React from 'react';
import PropTypes from 'prop-types';

import './Element.scss';

const FormElement = ({label, description, mandatory, children, link, className}) => {
  return (
    <div className={`h5p-hub-form-element ${mandatory ? 'h5p-hub-mandatory' : ''} ${className ? className : ''}`}>
      <label htmlFor={children.props.id}>{label}</label>
      <div className='h5p-hub-details-row'>
      {
        description &&
        <div className="h5p-hub-description">{description}</div>
      }
      {
        link &&
        <button className='h5p-hub-link-button' onClick={link.onClick}>{link.linkText}</button>
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
  }),
  className: PropTypes.string
};

export default FormElement;