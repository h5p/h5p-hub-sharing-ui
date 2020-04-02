import React from 'react';
import FormElement from '../generic/form/Element';

const Mandatory = () => {
  return (
    <>
      <FormElement label="Title" description="Testing description" mandatory={true}>
        <input id="title"></input>
      </FormElement>
    </>
  );
};

export default Mandatory;