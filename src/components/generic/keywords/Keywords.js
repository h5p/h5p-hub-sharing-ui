import React from 'react';
import PropTypes from 'prop-types';
import Chips from '../chips/Chips';
import TranslationContext from '../../../context/Translation';

import './Keywords.scss';

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
      if (chips.indexOf(event.target.value) === -1 && event.target.value !== '') {
        setChips([...chips, event.target.value]);
      }
      inputField.current.value = '';
    }
  }

  return (
    <>
      <Chips chips={chips} setChips={setChips}></Chips>
      <input className='input-field' placeholder={l10n.keywordsPlaceholder} onKeyDown={event => handleKeyDown(event)} ref={inputField} />
    </>
  )
};

Keywords.propTypes = {
  chips: PropTypes.array.isRequired,
  setChips: PropTypes.func.isRequired
};

export default Keywords;