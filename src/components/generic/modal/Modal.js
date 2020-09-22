import ReactModal from 'react-modal';
import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss'

const Modal = ({ isOpen, closeModal, children, onAfterOpen, className='' }) => {

  /**
   * Handle closing of modal
   */
  const onClose = () => {
    document.querySelector('.h5p-hub-publish').removeAttribute('aria-hidden');
    closeModal();
  }

  return (
    <div>
      <ReactModal 
      isOpen={isOpen}
      className={`h5p-hub-modal-content ${className}`}
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      overlayClassName='h5p-hub-modal-overlay'
      appElement={document.getElementById('h5p-hub-publish-modal-wrapper')}
      parentSelector={() => document.querySelector('.h5p-hub-publish')}
      >
        {children}
      </ReactModal>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.shape(),
  onAfterOpen: PropTypes.func,
  className: PropTypes.string
};

export default Modal;