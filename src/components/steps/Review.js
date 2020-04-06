import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TranslationContext from '../../context/Translation';
import ImagePreview from '../generic/form/ImagePreview';

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
  title,
  license,
  disciplines,
  keywords,
  shortDescription,
  longDescription,
  icon,
  screenshots
}) => {
  const l10n = useContext(TranslationContext);

  return (
    <>
      <div className="review-header">{l10n.reviewMessage}</div>

      <Message severity="warning">
        {l10n.subContentWarning}
      </Message>

      <dl>
        <Definition name={l10n.title}>{title}</Definition>
        <Definition name={l10n.license}>{license}</Definition>
        <Definition name={l10n.disciplines}>{disciplines.join(', ')}</Definition>
        <Definition name={l10n.keywords}>{keywords.join(', ')}</Definition>
        <Definition name={l10n.shortDescription}>{shortDescription}</Definition>
        <Definition name={l10n.longDescription}>{longDescription}</Definition>
        <Definition name={l10n.icon}>
          <ImagePreview src={icon}></ImagePreview>
        </Definition>
        <Definition name={l10n.screenshots}>
          {
            screenshots.map((value, idx) => 
              <ImagePreview key={idx} src={value}></ImagePreview>
            )
          }
        </Definition>
      </dl>
    </>
  );
};

Review.propTypes = {
  title: PropTypes.string.isRequired,
  license: PropTypes.object.isRequired,
  disciplines: PropTypes.array.isRequired,
  keywords: PropTypes.array,
  shortDescription: PropTypes.string.isRequired,
  longDescription: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  screenshots: PropTypes.array.isRequired
};

export default Review;