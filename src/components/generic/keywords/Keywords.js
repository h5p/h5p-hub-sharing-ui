import React from 'react';
import PropTypes from 'prop-types';
import Chips from '../chips/Chips';
import TranslationContext from '../../../context/Translation';
import Tip from '../tip/Tip';

import './Keywords.scss';

const Keywords = ({ chips, setKeywords }) => {

  const inputField = React.useRef(null);
  const l10n = React.useContext(TranslationContext);

  const [showTip, setShowTip] = React.useState(false);
  const [inputFocus, setInputFocus] = React.useState(false);
  /**
   * Add chip when input is pressed
   * @param  {Event} event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      const exists = chips.filter(chip => chip.toLowerCase() === value.toLowerCase());
      if(exists.length > 0) {
        setShowTip(true);
      }
      else if (chips.indexOf(value) === -1 && value !== '') {
        setKeywords([...chips, value]);
        inputField.current.value = '';
      }
    }
    else {
      setShowTip(false);
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
   * Return chips with id and name
   */
  const getChips = () => {
    return chips.map(chip => { return { id: chip, name: chip } });
  }

  return (
    <>
      <Chips chips={getChips()} setChips={setChips}></Chips>
      <input
        placeholder={l10n.keywordsPlaceholder}
        onKeyDown={event => handleKeyDown(event)}
        ref={inputField}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)} />
      <Tip
        text={l10n.keywordExists}
        open={showTip && inputFocus}
        className='h5p-hub-tip-keywords' />
    </>
  )
};

Keywords.propTypes = {
  chips: PropTypes.array.isRequired,
  setKeywords: PropTypes.func.isRequired
};

export default Keywords;