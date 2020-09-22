import React from 'react';
import PropTypes from 'prop-types';

import './TextField.scss';

const TextField = ({ title, description, mainText }) => (
  <div className='h5p-hub-text-field'>
    <div className='h5p-hub-title'>
      {title}
    </div>
    <div className='h5p-hub-description'>
      {description}
    </div>
    <div className='h5p-hub-main-text'>
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
