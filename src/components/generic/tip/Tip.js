import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ReadLabel from '../readLabel/ReadLabel';

import './Tip.scss';

const Tip = React.forwardRef(({ open, text, className, onTransitionEnd }, ref) => {

  const classNameCombined = `h5p-hub-tip${className ? ' ' + className : ''}`;

  return (
    <div
      className={classNameCombined}
    >
      <CSSTransition
        in={open}
        timeout={200}
        classNames="h5p-hub-tip-wrapper"
        onEntered={onTransitionEnd}
        onExited={onTransitionEnd}
      >
        <div ref={ref} className="h5p-hub-tip-wrapper">
          <div
            className="h5p-hub-tip"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </CSSTransition>
      <ReadLabel label={text} read={open}></ReadLabel>
    </div>
  );
});

Tip.displayName = 'Tip';


Tip.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onTransitionEnd: PropTypes.func
};

export default Tip;