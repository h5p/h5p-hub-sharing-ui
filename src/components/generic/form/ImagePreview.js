import React from 'react';
import PropTypes from 'prop-types';

import './ImagePreview.scss';

const ImagePreview = ({src}) => {

  const img = new Image();
  img.src = src;

  const style = {
    backgroundImage: `url('${img.src}')`
  };

  return (
    <span className="image-preview" style={style} />
  );
};

ImagePreview.propTypes = {
  src: PropTypes.string
};

export default ImagePreview;