import React from 'react';
import TranslationContext from '../../context/Translation';
import PropTypes from 'prop-types';

import './Success.scss';

const Success = ({ title, contentType }) => {

  const l10n = React.useContext(TranslationContext);

  const isEdit = (l10n.isNowSubmitted === l10n.changeHasBeenSubmitted);
  const submittedText = (
    <div className={ 'h5p-hub-now-submitted-text' + (isEdit ? ' h5p-hub-is-edit' : '') }>
      {l10n.isNowSubmitted}
    </div>
  );

  return (
    <>
      <div className='h5p-hub-success-page'>
        <div className='h5p-hub-step-icon-success'>
          <i className="h5p-hub-icon-check" />
        </div>
        <div className='h5p-hub-submitted-text'>
          {l10n.submitted}
        </div>
        <div className='h5p-hub-content-type'>
          {contentType}
        </div>
        { isEdit &&
          submittedText
        }
        <div className={ 'h5p-hub-title' + (isEdit ? ' h5p-hub-is-edit' : '') }>
          {title}
        </div>
        { !isEdit &&
          submittedText
        }
        <div className='h5p-hub-content-available'>
          {l10n.contentAvailable}
        </div>
      </div>
    </>
  );
};

Success.propTypes = {
  title: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired
}

export default Success;
