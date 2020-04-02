import React from 'react';
import FormElement from '../Generic/Form/Element';

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