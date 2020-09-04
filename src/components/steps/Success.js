import React from 'react';
import TranslationContext from '../../context/Translation';
import PropTypes from 'prop-types';

import './Success.scss';

const Success = ({ title, contentType }) => {

  const l10n = React.useContext(TranslationContext);

  const isEdit = (l10n.isNowSubmitted === l10n.changeHasBeenSubmitted);
  const submittedText = (
    <div className={ 'now-submitted-text' + (isEdit ? ' is-edit' : '') }>
      {l10n.isNowSubmitted}
    </div>
  );

  return (
    <>
      <div className='success-page'>
        <div className='step-icon-success'>
          <i className="icon-check" />
        </div>
        <div className='submitted-text'>
          {l10n.submitted}
        </div>
        <div className='content-type'>
          {contentType}
        </div>
        { isEdit &&
          submittedText
        }
        <div className={ 'title' + (isEdit ? ' is-edit' : '') }>
          {title}
        </div>
        { !isEdit &&
          submittedText
        }
        <div className='content-available'>
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
