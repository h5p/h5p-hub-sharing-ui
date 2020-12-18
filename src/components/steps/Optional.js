import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Keywords from '../generic/keywords/Keywords';
import FormElement from '../generic/form/Element';
import TranslationContext from '../../context/Translation';
import { replace, optionalDefinition } from '../../utils/helpers';
import ImageUpload from '../generic/form/ImageUpload';
import Tip from '../generic/tip/Tip';

import './Optional.scss';

const Optional = ({ optionalInfo, setOptionalInfo, setIsValid }) => {

  const l10n = React.useContext(TranslationContext);
  const altInputRefs = React.useRef([]);
  const shortDescriptionRef = React.useRef();
  const longDescriptionRef = React.useRef();

  const uploadedImages = optionalInfo.screenshots.filter(el => el && el.src !== '' && el.src !== undefined);

  const shortDescriptionMaxLength = 255;
  const longDescriptionMaxLength = 511;

  const [shortDescriptionFocus, setShortDescriptionFocus] = useState(false);
  const [longDescriptionFocus, setLongDescriptionFocus] = useState(false);

  /**
   * Set focus to the newly added item
   * Has to do it when there number of uploaded img change,
   * because inputfield to focus on dosen't exist in setScreenshot
   */
  React.useEffect(() => {
    altInputRefs.current = altInputRefs.current.slice(0, optionalInfo.screenshots.length);
    if (altInputRefs.current[uploadedImages.length - 1]) {
      altInputRefs.current[uploadedImages.length - 1].focus();
    }
  }, [uploadedImages.length, optionalInfo.screenshots.length]);

  /**
   * Set data in optionalInfo
   * @param {string} data
   * @param {string} type
   */
  const setInfo = (data, type) => {
    setOptionalInfo(prevState => ({
      ...prevState,
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
      tmpOptional.screenshots[index] = { ...tmpOptional.screenshots[index], src: img.src, file: img.file, alt: '' };
      //If img removed move all img one index up
      if (img.src === undefined) {
        for (let i = index; i < uploadedImages.length - 1; i++) {
          tmpOptional.screenshots[i] = optionalInfo.screenshots[i + 1];
        }
        tmpOptional.screenshots[uploadedImages.length - 1] = { src: '', alt: '', file: undefined };
      }
      return tmpOptional;
    });
    if (altInputRefs.current[index]) {
      //Set focus if image is changed
      altInputRefs.current[index].focus();
    }
  };

  /**
   * Set alt text to screenshot
   * @param  {string} alt
   * @param  {number} index
   */
  const setAltText = (alt, index) => {
    setOptionalInfo(() => {
      const tmpOptional = { ...optionalInfo };
      tmpOptional.screenshots[index].alt = alt;
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

  return (
    <>
      <div className="h5p-hub-columns">
        <div className="h5p-hub-column">
          <FormElement label={l10n.age} description={l10n.ageDescription}>
            <input
              onChange={e => setInfo(e.target.value, 'age')}
              value={optionalInfo.age}
            />
          </FormElement>
        </div>
      </div>
      <FormElement
        label={l10n.keywords}
        description={l10n.keywordsDescription}
      >
        <Keywords chips={optionalInfo.keywords} setKeywords={(chips) => setInfo(chips, 'keywords')} />
      </FormElement>
      <div className='h5p-hub-columns'>
        <div className='h5p-hub-column'>
          <FormElement label={l10n.shortDescription}>
            <textarea
              value={optionalInfo.shortDescription ? optionalInfo.shortDescription : ''}
              id="h5p-hub-form-short-description"
              placeholder={l10n.shortDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'shortDescription')}
              className='h5p-hub-short-description'
              maxLength={shortDescriptionMaxLength}
              onFocus={() => setShortDescriptionFocus(true)}
              onBlur={() => setShortDescriptionFocus(false)}/>
          </FormElement>
          <Tip
            text={replace(l10n.maxLength, { ':length': shortDescriptionMaxLength })}
            open={optionalInfo.shortDescription.length === shortDescriptionMaxLength && shortDescriptionFocus}
            className='h5p-hub-tip-text-field'/>
          <FormElement label={l10n.description}>
            <textarea
              value={optionalInfo.longDescription ? optionalInfo.longDescription : ''}
              id="h5p-hub-form-long-description"
              placeholder={l10n.longDescriptionPlaceholder}
              maxLength={longDescriptionMaxLength}
              onChange={(event) => setInfo(event.target.value, 'longDescription')}
              onFocus={() => setLongDescriptionFocus(true)}
              onBlur={() => setLongDescriptionFocus(false)} />
          </FormElement>
          <Tip
            text={replace(l10n.maxLength, { ':length': longDescriptionMaxLength })}
            open={optionalInfo.longDescription.length === longDescriptionMaxLength && longDescriptionFocus}
            className='h5p-hub-tip-text-field' />
        </div>
        <div className='h5p-hub-column'>
          <FormElement label={l10n.icon} description={l10n.iconDescription}>
            <ImageUpload
              img={optionalInfo.icon}
              onFile={img => setInfo(img, 'icon')}
              clearImage={() =>
                setOptionalInfo(prevState => ({
                  ...prevState,
                  remove_icon: !!optionalInfo.icon.old
                }))
              }
              ariaLabel={l10n.icon}
              removeImageLabel={l10n.removeImage} />
          </FormElement>
          <FormElement label={l10n.screenshots} description={l10n.screenshotsDescription}>
            <div id='h5p-hub-form-screenshots'>
              {optionalInfo.screenshots.map((img, i) =>
                img.src &&
                <div className='h5p-hub-row' key={i}>
                  <ImageUpload
                    key={i}
                    img={img}
                    onFile={img => setScreenshot(img, i)}
                    clearImage={() =>
                      img.old ? setOptionalInfo(prevState => ({
                        ...prevState,
                        remove_screenshots: [...prevState.remove_screenshots, img.src.match(/([^\/])+$/)[0]]
                      })) : null
                    }
                    ariaLabel={l10n.screenshots}
                    removeImageLabel={l10n.removeImage} />
                  <FormElement label={l10n.altText} mandatory={true}>
                    <input
                      className="h5p-hub-alt-text"
                      id={`h5p-hub-form-alt-text-${i}`}
                      value={optionalInfo.screenshots[i].alt}
                      onChange={(event) => setAltText(event.target.value, i)}
                      ref={el => altInputRefs.current[i] = el} />
                  </FormElement>
                </div>
              )}
              {uploadedImages.length < 5
                &&
                <ImageUpload
                  onFile={img => setScreenshot(img, uploadedImages.length)}
                  ariaLabel={l10n.screenshots}
                  removeImageLabel={l10n.removeImage} />
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
