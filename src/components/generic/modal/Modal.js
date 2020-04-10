import ReactModal from 'react-modal';
import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss'

const Modal = ({ isOpen, closeModal, parent, children }) => {

  /**
   * Handle closing of modal
   */
  const onClose = () => {
    document.querySelector(parent).removeAttribute('aria-hidden');
    closeModal();
  }

  /**
   * Set app element
   */
  React.useEffect(() => {
    ReactModal.setAppElement(parent);
  });

  return (
    <div>
      <ReactModal 
      isOpen={isOpen}
      className='modal-content'
      onRequestClose={onClose}
      overlayClassName='modal-overlay'
      parentSelector={() => document.querySelector(parent)}
      >
        {children}
      </ReactModal>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  parent: PropTypes.string.isRequired,
  children: PropTypes.shape()
};

export default Modal;