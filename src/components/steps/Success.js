import React from 'react';
import TranslationContext from '../../context/Translation';

import './Sucess.scss';

const Success = ({ title, contentType }) => {

  const l10n = React.useContext(TranslationContext);

  return (
    <>
      <div className='sucess-page'>
        <div className='step-icon-sucess'>
          <i className="icon-check" />
        </div>
        <div className='submitted-text'>
          {l10n.submitted}
        </div>
        <div className='content-type'>
          {contentType}
        </div>
        <div className='title'>
          {title}
        </div>
        <div className='now-submitted-text'>
          {l10n.isNowSubmitted}
        </div>
        <div className='content-available'>
          {l10n.contentAvailable}
        </div>
      </div>
    </>
  );
};

export default Success;