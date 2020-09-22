import React from 'react';
import PropTypes from 'prop-types';

import './ReadLabel.scss';

const ReadLabel = ({ label, read }) => (
  <div
    aria-live='polite'
    className='h5p-hub-hidden-read'
    dangerouslySetInnerHTML={{ __html: read ? label: '' }} />
)

ReadLabel.propTypes = {
  label: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired
}

export default ReadLabel