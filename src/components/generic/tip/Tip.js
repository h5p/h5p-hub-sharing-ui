import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ReadLabel from '../readLabel/ReadLabel';

import './Tip.scss';

const Tip = React.forwardRef(({ open, text, className, onTransitionEnd }, ref) => {

  const classNameCombined = `tip${className ? ' ' + className : ''}`;

  return (
    <div
      className={classNameCombined}
    >
      <CSSTransition
        in={open}
        timeout={200}
        classNames="tip-wrapper"
        onEntered={onTransitionEnd}
        onExited={onTransitionEnd}
      >
        <div ref={ref} className="tip-wrapper">
          <div
            className="tip"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </CSSTransition>
      <ReadLabel label={text} read={open}></ReadLabel>
    </div>
  );
});

Tip.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onTransitionEnd: PropTypes.func
};

export default Tip;