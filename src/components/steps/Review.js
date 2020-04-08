import React, {useContext} from 'react';
import TranslationContext from '../../context/Translation';
import ImagePreview from '../generic/form/ImagePreview';
import {replace, mandatoryDefinition, optionalDefinition} from '../../utils/helpers';
import Message from '../generic/message/Message';
import MetadataContext from '../../context/Metadata';

import './Review.scss';

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
  const metadata = useContext(MetadataContext);

  return (
    <>
      <div className="review-header">{l10n.reviewMessage}</div>

      <Message severity="warning">
        {replace(l10n.subContentWarning, {
          ':license': metadata.getLicenseForHumans(mandatoryInfo.license, mandatoryInfo.licenseVersion)
        })}
        
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