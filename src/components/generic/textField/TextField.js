import React from 'react';
import PropTypes from 'prop-types';

import './TextField.scss';

const TextField = ({ title, description, mainText }) => (
  <div className='text-field'>
    <div className='title'>
      {title}
    </div>
    <div className='description'>
      {description}
    </div>
    <div className='main-text'>
      {mainText}
    </div>
  </div>
);

TextField.propTypes = {
  text: PropTypes.string,
  description: PropTypes.string,
  mainText: PropTypes.string
};

export default TextField;
