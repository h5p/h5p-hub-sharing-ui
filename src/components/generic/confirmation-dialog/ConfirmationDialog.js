import React from 'react';
import PropTypes from 'prop-types';

import './ConfirmationDialog.scss';

const ConfirmationDialog = ({ onConfirm, onCancel, l10n }) => {
  return (
    <>
      <div className='h5p-hub-dialog-header'>
        <div className='h5p-hub-dialog-title'>
          <span>{l10n.cancelPublishConfirmationDialogTitle}</span>
        </div>
      </div>
      <div className="h5p-hub-dialog-content">
        {l10n.cancelPublishConfirmationDialogDescription}
        <div className="h5p-hub-button-group">
          <button onClick={onCancel} autoFocus={true}>
            {l10n.cancelPublishConfirmationDialogCancelButtonText}
          </button>
          <button onClick={onConfirm} className="h5p-hub-danger">
            {l10n.cancelPublishConfirmationDialogConfirmButtonText}
          </button>
        </div>
      </div>
    </>
  );
};

ConfirmationDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  l10n: PropTypes.shape({
    cancelPublishConfirmationDialogTitle: PropTypes.string.isRequired,
    cancelPublishConfirmationDialogDescription: PropTypes.string.isRequired,
    cancelPublishConfirmationDialogCancelButtonText: PropTypes.string.isRequired,
    cancelPublishConfirmationDialogConfirmButtonText: PropTypes.string.isRequired
  }).isRequired
};

export default ConfirmationDialog;