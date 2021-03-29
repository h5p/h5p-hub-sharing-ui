import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Chips from '../chips/Chips';
import TranslationContext from '../../../context/Translation';
import Tip from '../tip/Tip';

import './Keywords.scss';

const Keywords = ({ chips, setKeywords, setTempKeywords, id }) => {

  const inputField = React.useRef(null);
  const l10n = React.useContext(TranslationContext);

  const [showTip, setShowTip] = React.useState(false);
  const [tipText, setTipText] = React.useState('');
  const [inputFocus, setInputFocus] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [buttonFocus, setButtonFocus] = React.useState(false);

  /**
   * Add chip when input is pressed
   * @param  {Event} event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addChips(inputValue, setChips, true);
    }
    else {
      setShowTip(false);
    }
  }

  /**
   * @param  {String} value
   * @param  {Function} setKeywordsFunc
   * @param  {Boolean} clearInput
   */
  const addChips = (value, setKeywordsFunc, clearInput) => {
    const newChips = value.split(',');
    const chipsToAdd = [];
    let exists = false;
    for (let i = 0; i < newChips.length; i++) {
      const trimmedChip = newChips[i].trim();
      const chipExists = chips.filter(chip => chip.toLowerCase() === trimmedChip.toLowerCase()).length > 0;
      if (chipExists) {
        exists = true;
      }
      else if (!chipExists && trimmedChip !== '' && chipsToAdd.indexOf(trimmedChip) === -1) {
        chipsToAdd.push(trimmedChip);
      }
    }
    // User tries to add a chip and it allready exists
    if (exists && newChips.length === 1) {
      setTipText(l10n.keywordExists);
      setShowTip(true);
    }
    // User tries to add multiple chips and all exist already
    else if (exists && chipsToAdd < 1) {
      setTipText(l10n.keywordsExists);
      setShowTip(true);
    }
    // Some of the chips already exists
    // We add the ones that isn't already added
    else if (exists) {
      setTipText(l10n.someKeywordsExits);
      setShowTip(true);
      setKeywordsFunc(chips.concat(chipsToAdd))
      if (clearInput) {
        setInputValue('');
      }
      setTimeout(() =>{
        setShowTip(false);
        setTipText('');
      }, 1000)
    }
    else {
      setKeywordsFunc(chips.concat(chipsToAdd));
      if (clearInput) {
        setInputValue('');
      }
    }
  }

  /**
   * Set chips and focus to input field when last chip is deleted
   * @param  {string[]} chips - id of chips
   */
  const setChips = (chips) => {
    setKeywords(chips);
    if (chips.length === 0) {
      inputField.current.focus();
    }
  }

  /**
   * Add chips to temp variable when removing focus
   */
  const handleOnBlur = () => {
    setInputFocus(false)
    if (inputValue.length > 0) {
      addChips(inputValue, setTempKeywords, false);
    }
  }

  /**
   * Add keywords and reset focus to inputfield
   */
  const handleButtonClick = () => {
    addChips(inputValue, setChips, true);
    if (inputField.current) {
      inputField.current.focus();
    }
  }

  /**
   * Return chips with id and name
   */
  const getChips = () => {
    return chips.map(chip => { return { id: chip, name: chip } });
  }
  return (
    <>
      <Chips chips={getChips()} setChips={setChips}></Chips>
      <div className='h5p-hub-keywords-input-wrapper'>
        <input
          placeholder={l10n.keywordsPlaceholder}
          onKeyDown={event => handleKeyDown(event)}
          ref={inputField}
          onFocus={() => setInputFocus(true)}
          onBlur={handleOnBlur}
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value) }}
          id={id}
        />
        <button
          disabled={inputValue.length < 1}
          className={`h5p-hub-add-button ${inputValue.length < 1 ? 'disabled' : ''}`}
          onClick={handleButtonClick}
          dangerouslySetInnerHTML={{ __html: `+ ${l10n.add}` }}
          onFocus={() => setButtonFocus(true)}
          onBlur={() => setButtonFocus(false)}
        />
      </div>
      <Tip
        text={tipText}
        open={showTip && (inputFocus || buttonFocus)}
        className='h5p-hub-tip-keywords' />
    </>
  )
};

Keywords.propTypes = {
  chips: PropTypes.array.isRequired,
  setKeywords: PropTypes.func.isRequired,
  setTempKeywords: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Keywords;