import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './ImagePreview.scss';

const ImagePreview = ({src}) => {

  const img = useMemo(() => {
    const img = new Image();
    img.src = src;
    return img;
  }, [src]);

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