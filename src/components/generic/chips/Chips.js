import React from 'react';
import PropTypes from 'prop-types';
import './Chips.scss';
import TranslationContext from '../../../context/Translation';
import { replace } from '../../../utils/helpers';


const Chips = ({ chips, setChips }) => {

  const l10n = React.useContext(TranslationContext);
  const chipsRef = React.useRef([]);

  /**
   * Initialize chip refs
   */
  React.useEffect(() => {
    chipsRef.current = chipsRef.current.slice(0, chips.length);
  }, [chips]);

  /**
   * Remove a chip when clicked on
   * @param  {string} chip
   */
  const removeChip = (chip) => {
    // Set focus to previous item
    const index = chips.indexOf(chip);
    if (chips.length > 1) {
      chipsRef.current[index !== 0 ? index - 1 : 1].focus();
    }
    setChips(chips.filter(element => element !== chip));
  }

  return (
    chips.length > 0 ?
      <ul className='chips-list'>
        {chips.map((chip, i) =>
          <li key={chip}>
            <span className='sr-only'>{chip}</span>
            <button
              ref={el => chipsRef.current[i] = el}
              aria-label={replace(l10n.removeChip, { ':chip': chip })}
              onClick={() => removeChip(chip)}>
              {chip}
              <div className='icon-close'></div>
            </button>
          </li>)}
      </ul>
      : null
  )
};

Chips.propTypes = {
  chips: PropTypes.array.isRequired,
  setChips: PropTypes.func.isRequired
};

export default Chips;