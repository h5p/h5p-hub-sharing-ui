import React, { useContext } from 'react';
import TranslationContext from '../../context/Translation';
import ImagePreview from '../generic/form/ImagePreview';
import { replace, mandatoryDefinition, optionalDefinition } from '../../utils/helpers';
import Message from '../generic/message/Message';
import MetadataContext from '../../context/Metadata';

import './Review.scss';

const Definition = ({ name, children }) => {
  return (
    <div className="h5p-hub-definition">
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
  const license = metadata.getLicenseForHumans(mandatoryInfo.license, mandatoryInfo.licenseVersion);
  const disciplines = mandatoryInfo.disciplines.map(id => metadata.getDiscipline(id).name);

  return (
    <>
      <div className="h5p-hub-review-header">{l10n.reviewMessage}</div>

      <Message severity="warning">
        {replace(l10n.subContentWarning, {
          ':license': license
        })}
      </Message>

      <dl>
        <Definition name={l10n.title}>{mandatoryInfo.title}</Definition>
        <Definition name={l10n.license}>{license}</Definition>
        <Definition name={l10n.language}>{metadata.getLanguage(mandatoryInfo.language).name}</Definition>
        <Definition name={l10n.level}>{metadata.getLevel(mandatoryInfo.level).name}</Definition>
        <Definition name={l10n.disciplines}>{disciplines.join(', ')}</Definition>
        <Definition name={l10n.keywords}>{optionalInfo.keywords.join(', ')}</Definition>
        <Definition name={l10n.shortDescription}>{optionalInfo.shortDescription}</Definition>
        <Definition name={l10n.longDescription}>{optionalInfo.longDescription}</Definition>
        <Definition name={l10n.icon}>
          <ImagePreview src={optionalInfo.icon.src}></ImagePreview>
        </Definition>
        <Definition name={l10n.screenshots}>
          {
            optionalInfo.screenshots.map((img, idx) =>
              img.file &&
              <div key={idx} className='h5p-hub-row h5p-hub-screenshots'>
                <ImagePreview key={idx} src={img.src} />
                <div className='h5p-hub-img-alt'>{img.alt}</div>
              </div>
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