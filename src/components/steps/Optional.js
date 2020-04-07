import React from 'react';
import PropTypes from 'prop-types';
import Keywords from '../generic/keywords/Keywords';
import FormElement from '../generic/form/Element';
import TranslationContext from '../../context/Translation';
import MetadataContext from '../../context/Metadata';
import ImagePreview from '../generic/form/ImagePreview';

import './Optional.scss';

const Optional = ({ optionalInfo, setOptionalInfo }) => {

  const l10n = React.useContext(TranslationContext);

  /**
   * Updates chips in optionalInfo
   * @param  {string[]} chips
   */
  const setChips = (chips) => {
    setOptionalInfo(() => ({
      ...optionalInfo,
      keywords: chips
    }));
  }

  const metadata = React.useContext(MetadataContext);

  /**
   * Set data
   * @param {string} data
   */
  const setInfo = (data, type) => {
    setOptionalInfo(() => ({
      ...optionalInfo,
      [type]: data
    }));
  }

  console.log(optionalInfo);


  return (
    <>
      <div className='keywords'>
        <FormElement label={l10n.keywords}>
          <Keywords chips={optionalInfo.keywords} setChips={setChips}></Keywords>
        </FormElement>
      </div>
      {/*  <FormElement label={l10n.language}>
        <Dropdown options={metadata.languages} onChange={(data) => setInfo(data,'language')}></Dropdown>
      </FormElement> 
      <FormElement label={l10n.lavel}>
        <Dropdown options={metadata.levels} onChange={(data) => setInfo(data,'level')}></Dropdown> 
      </FormElement>  */}
      <div className='optional-second-part'>
        <div className='descriptions'>
          <FormElement label={l10n.shortDescription}>
            <textarea
              value={optionalInfo.shortDescription ? optionalInfo.shortDescription : ''}
              id="short-description"
              placeholder={l10n.shortDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'shortDescription')}
              className='short-description'>
            </textarea>
          </FormElement>
          <FormElement label={l10n.description}>
            <textarea
              value={optionalInfo.longDescription ? optionalInfo.longDescription : ''}
              id="long-description"
              placeholder={l10n.longDescriptionPlaceholder}
              onChange={(event) => setInfo(event.target.value, 'longDescription')}
              className='long-description'>
            </textarea>
          </FormElement>
        </div>
        <div className='optional-images'>
          <div className='optional-upload-icon'>
            <FormElement label={l10n.icon} description={l10n.iconDescription}>
            <ImagePreview></ImagePreview>
          </FormElement>
          </div>
          <FormElement label={l10n.screenshots} description={l10n.screenshotsDescription}>
            <div id='screenshots'>
              {optionalInfo.screenshots.map((element, i) =>
                <ImagePreview id={i}></ImagePreview>
              )}
            </div>
          </FormElement>
        </div>
      </div>
    </>
  );
};

Optional.propTypes = {
  optionalInfo: PropTypes.object.isRequired,
  setOptionalInfo: PropTypes.func.isRequired
}

export default Optional;