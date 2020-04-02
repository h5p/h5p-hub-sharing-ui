import React from 'react';

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

export default FormElement;