import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import Keywords from '../generic/keywords/Keywords';
import FormElement from '../generic/form/Element';
import TranslationContext from '../../context/Translation';
import { replace, optionalDefinition } from '../../utils/helpers';
import ImageUpload from '../generic/form/ImageUpload';
import Tip from '../generic/tip/Tip';

import './Optional.scss';
import Dropdown from "../generic/dropdown/Dropdown";
import DisciplineSelector from "../generic/discipline/DisciplineSelector";
import MetadataContext from "../../context/Metadata";

const Optional = ({ optionalInfo, setOptionalInfo, setIsValid }) => {

  const l10n = useContext(TranslationContext);
  const metadata = useContext(MetadataContext);

  const altInputRefs = React.useRef([]);
  const shortDescriptionRef = React.useRef();
  const longDescriptionRef = React.useRef();

  const uploadedImages = optionalInfo.screenshots.filter(el => el && el.src !== '' && el.src !== undefined);

  const shortDescriptionMaxLength = 255;
  const longDescriptionMaxLength = 511;

  const [shortDescriptionFocus, setShortDescriptionFocus] = useState(false);
  const [longDescriptionFocus, setLongDescriptionFocus] = useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});

  const MAX_DISCIPLINES = 10;


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

      // Add image for removal if an old image was replaced
      const replacedImage = tmpOptional.screenshots[index];
      if (replacedImage && replacedImage.old) {
        tmpOptional.remove_screenshots = [
          ...tmpOptional.remove_screenshots,
          replacedImage.src.match(/([^\/])+$/)[0],
        ];
      }

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
   * Intercept the setting of selected disciplines in order to detect if the
   * limit has been reached, and if so, update fieldErrors state variable.
   *
   * Assumes that the order of items in the checked parameter is the order of
   * selection, meaning that the last item in the array is the one where we
   * want to display an error message, indicating that the checkbox did not get
   * selected.
   *
   * @param {string[]} checked
   */
  const handleSetDisciplines = (checked) => {
    if (checked.length <= MAX_DISCIPLINES) {
      setInfo(checked, 'disciplines')
      setFieldErrors((prevState) => {
        delete prevState.disciplines;
        return prevState;
      });
    }
    else {
      const lastSelectedDiscipline = [...checked].pop();
      setFieldErrors((prevState) => ({
        ...prevState,
        disciplines: {
          [lastSelectedDiscipline]: replace(l10n.disciplineLimitReachedMessage, { ':numDisciplines': MAX_DISCIPLINES })
        }
      }));
    }
  };

  /**
   * Only allow numbers and dashes in the age field
   * @param  {String} value
   */
  const setAge = (value) => {
    const regex = /^[0-9-]*$/;
    if(value.match(regex) || value === '') {
      setInfo(value, 'age')
    }
  }

  /**
   * Update IsValid when screenshots alt text change
   */
  React.useEffect(() => {
    setIsValid(
      optionalInfo.screenshots.filter(img => img.file && img.alt === '').length === 0
      && optionalInfo.disciplines.length <= 10
    );
  }, [optionalInfo, setIsValid]);

  return (
    <>
      <FormElement
        label={l10n.disciplineLabel}
        description={l10n.disciplineDescription}
      >
        <DisciplineSelector
          disciplines={optionalInfo.disciplines}
          errors={fieldErrors.disciplines}
          setDisciplines={handleSetDisciplines}
          id='h5p-hub-filter-search-bar'/>
      </FormElement>
      <div className="h5p-hub-row">
        <FormElement label={l10n.age} description={l10n.ageDescription}>
          <input
            onChange={e => setAge(e.target.value, 'age')}
            value={optionalInfo.age}
            id='h5p-hub-form-age'
          />
        </FormElement>
        <FormElement label={l10n.level}>
          <Dropdown
            options={metadata.levels}
            onChange={(e) => setInfo(e.target.value, 'level')}
            selected={optionalInfo.level}
            allowNone={true}
            id='h5p-hub-form-level'/>
        </FormElement>
      </div>
      <FormElement
        label={l10n.keywords}
        description={l10n.keywordsDescription}
      >
        <Keywords
          chips={optionalInfo.keywords}
          setKeywords={(chips) => setInfo(chips, 'keywords')}
          setTempKeywords={(chips) => setInfo(chips, 'tempKeywords')}
          id='h5p-hub-form-keywords'/>
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
              removeImageLabel={l10n.removeImage}
              id='h5p-hub-form-icon'/>
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
