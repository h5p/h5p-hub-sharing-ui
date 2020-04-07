import React from 'react';
import PropTypes from 'prop-types';
import Chips from '../chips/Chips';
import TranslationContext from '../../../context/Translation';

const Keywords = ({ chips, setChips }) => {

  const inputField = React.useRef(null);
  const l10n = React.useContext(TranslationContext);

  /**
   * Add chip when input is pressed
   * @param  {Event} event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (chips.indexOf(value) === -1 && value !== '') {
        setChips([...chips, value]);
      }
      inputField.current.value = '';
    }
  }

  /**
   * Set focus to input field when last chip is deleted
   */
  const handleDeleteLastChip = () =>{
    inputField.current.focus();
  }

  return (
    <>
      <Chips chips={chips} setChips={setChips} deleteLastChip={handleDeleteLastChip}></Chips>
      <input
        className='input-field'
        placeholder={l10n.keywordsPlaceholder}
        onKeyDown={event => handleKeyDown(event)}
        ref={inputField} />
    </>
  )
};

Keywords.propTypes = {
  chips: PropTypes.array.isRequired,
  setChips: PropTypes.func.isRequired
};

export default Keywords;