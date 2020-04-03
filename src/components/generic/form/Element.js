import React from 'react';
import PropTypes from 'prop-types';

import './Element.scss';

const FormElement = ({label, description, mandatory, children}) => {
  return (
    <div className="form-element">
      <label htmlFor={children.props.id}>{label}</label>
      {
        description &&
        <div className="description">{description}</div>
      }
      {children}
    </div>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  mandatory: PropTypes.bool,
  children: PropTypes.shape()
};

export default FormElement;