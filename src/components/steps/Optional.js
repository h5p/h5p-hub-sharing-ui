import React from 'react';
import PropTypes from 'prop-types';
import Keywords from '../generic/keywords/Keywords';
import FormElement from '../generic/form/Element';
import TranslationContext from '../../context/Translation';
import {optionalDefinition} from '../../utils/helpers';

import './Optional.scss';
import ImageUpload from '../generic/form/ImageUpload';

const Optional = ({ optionalInfo, setOptionalInfo, setIsValid }) => {

  const l10n = React.useContext(TranslationContext);

  /**
   * Set data in optionalInfo
   * @param {string} data
   * @param {string} type
   */
  const setInfo = (data, type) => {
    setOptionalInfo(() => ({
      ...optionalInfo,
      [type]: data
    }));
  };

  /**
   * Set file and src to screenshot
   * @param  {object} img {src, file}
   * @param  {number} index
   */
  const setScreenshot = (img, index) => {
    setOptionalInfo(() => {
      const tmpOptional = { ...optionalInfo };
      tmpOptional.screenshots[index] = { ...tmpOptional.screenshots[index], src: img.src, file: img.file };
      return tmpOptional;
    });
  };

  /**
   * Set alt text to screenshot
   * @param  {string} alt
   * @param  {number} index
   */
  const setAltText = (alt, index) => {
    setOptionalInfo(() => {
      const tmpOptional = { ...optionalInfo };
      tmpOptional.screenshots[index] = { ...tmpOptional.screenshots[index], alt: alt };
      return tmpOptional;
    })
  }

  /**
   * Update IsValid when screenshots alt text change
   */
  React.useEffect(() => {
    setIsValid(
      optionalInfo.screenshots.filter(img => img.file && img.alt === '').length === 0)
    }, [optionalInfo, setIsValid]);
  
  const screenshotsLength = optionalInfo.screenshots.filter(screenshot => screenshot.file).length;

  return (
    <>
      <FormElement label={l10n.keywords}>
        <Keywords chips={optionalInfo.keywords} setKeywords={(chips) => setInfo(chips, 'keywords')} />
      </FormElement>
      <div className='columns'>
        <div className='column'>
          <FormElement label={l10n.shortDescription}>
            <textarea
              value={optionalInfo.shortDescription ? optionalInfo.shortDescription : ''}
              id="short-description"
              placeholder={l10n.shortDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'shortDescription')}
              className='short-description' />
          </FormElement>
          <FormElement label={l10n.description}>
            <textarea
              value={optionalInfo.longDescription ? optionalInfo.longDescription : ''}
              id="long-description"
              placeholder={l10n.longDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'longDescription')} />
          </FormElement>
        </div>
        <div className='column'>
          <FormElement label={l10n.icon} description={l10n.iconDescription}>
            <ImageUpload
              img={optionalInfo.icon}
              onFile={img => setInfo(img, 'icon')}
              ariaLabel={l10n.icon} />
          </FormElement>
          <FormElement label={l10n.screenshots} description={l10n.screenshotsDescription}>
            <div id='screenshots'>
              {optionalInfo.screenshots.map((img, i) =>
                img.file &&
                <div className='row' key={i}>
                  <ImageUpload
                    key={i}
                    img={img}
                    onFile={img => setScreenshot(img, i)}
                    ariaLabel={l10n.screeenshots} />
                  <FormElement label={l10n.altText} mandatory={true}>
                    <input value={optionalInfo.screenshots[i].alt} onChange={(event) => setAltText(event.target.value, i)}></input>
                  </FormElement>
                </div>
              )}
              {screenshotsLength < 5
                &&
                <ImageUpload
                  key={screenshotsLength}
                  img={optionalInfo.screenshots[screenshotsLength]}
                  onFile={img => setScreenshot(img, screenshotsLength)}
                  ariaLabel={l10n.screeenshots} />
              }
            </div>
          </FormElement>
        </div>
      </div>
    </>
  );
};

Optional.propTypes = {
  optionalInfo: optionalDefinition,
  setOptionalInfo: PropTypes.func.isRequired,
  setIsValid: PropTypes.func.isRequired
};

export default Optional;