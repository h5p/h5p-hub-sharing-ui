import React, {useContext} from 'react';
import TranslationContext from '../../context/Translation';
import ImagePreview from '../generic/form/ImagePreview';
import {mandatoryDefinition, optionalDefinition} from '../../utils/helpers';

import './Review.scss';
import Message from '../generic/message/Message';

const Definition = ({name, children}) => {
  return (
    <div className="definition">
        <dt>{name}</dt>
        <dd>{children}</dd>
    </div>
  );
}

const Review = ({
  mandatoryInfo,
  optionalInfo
}) => {
  const l10n = useContext(TranslationContext);

  return (
    <>
      <div className="review-header">{l10n.reviewMessage}</div>

      <Message severity="warning">
        {l10n.subContentWarning}
      </Message>

      <dl>
        <Definition name={l10n.title}>{mandatoryInfo.title}</Definition>
        <Definition name={l10n.license}>{mandatoryInfo.license}</Definition>
        <Definition name={l10n.disciplines}>{mandatoryInfo.disciplines.join(', ')}</Definition>
        <Definition name={l10n.keywords}>{optionalInfo.keywords.join(', ')}</Definition>
        <Definition name={l10n.shortDescription}>{optionalInfo.shortDescription}</Definition>
        <Definition name={l10n.longDescription}>{optionalInfo.longDescription}</Definition>
        <Definition name={l10n.icon}>
          <ImagePreview src={optionalInfo.icon}></ImagePreview>
        </Definition>
        <Definition name={l10n.screenshots}>
          {
            optionalInfo.screenshots.map((value, idx) => 
              <ImagePreview key={idx} src={value}></ImagePreview>
            )
          }
        </Definition>
      </dl>
    </>
  );
};

Review.propTypes = {
  mandatoryInfo: mandatoryDefinition,
  optionalInfo: optionalDefinition
};

export default Review;