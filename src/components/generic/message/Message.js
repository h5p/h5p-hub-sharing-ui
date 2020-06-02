import React from 'react';
import PropTypes from 'prop-types';

import './Message.scss';

const Message = ({severity, children}) => {
  return (
    <div className={`message ${severity}`}>
      {children}
    </div>
  );
};

Message.propTypes = {
  severity: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Message;