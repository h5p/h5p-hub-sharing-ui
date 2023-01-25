import React from 'react';
import PropTypes from 'prop-types';
import './Chips.scss';
import TranslationContext from '../../../context/Translation';
import { replace } from '../../../utils/helpers';
import Button from '../../generic/button/Button';

const Chips = ({ chips, setChips }) => {

  const l10n = React.useContext(TranslationContext);
  const chipsRef = React.useRef([]);

  /**
   * Initialize chip refs
   */
  React.useEffect(() => {
    chipsRef.current = chipsRef.current.slice(0, chips.length);
  }, [chips]);


  const findChip = (id) => {
    for (let i = 0; i < chips.length; i++) {
      if (chips[i].id === id) {
        return chips[i];
      }
    }
  }

  /**
   * Delete chip if enter, backspace or delete is pressed
   * @param  {Event} event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      removeChip(findChip(event.target.id));
    }
  }

  /**
   * Remove a chip when clicked on
   * @param  {string} chip
   */
  const removeChip = (chip) => {
    // Set focus to previous item
    const index = chips.indexOf(chip);
    if (chips.length > 1 && chipsRef.current[index !== 0 ? index - 1 : 1]) {
      chipsRef.current[index !== 0 ? index - 1 : 1].focus();
    }
    setChips(chips.filter(element => element.id !== chip.id).map(element => element.id));
  };

  return (
    chips.length > 0 ?
      <ul className='h5p-hub-chips-list'>
        {chips.map((chip, i) =>
          <li key={chip.id}>
            <span className='h5p-hub-sr-only'>{chip.name}</span>
            <Button
              ref={el => chipsRef.current[i] = el}
              ariaLabel={replace(l10n.removeChip, { ':chip': chip.name })}
              onClick={() => removeChip(chip)}
              onKeyDown={event => handleKeyDown(event)}>
              {chip.name}
              <div className='h5p-hub-icon-close'></div>
            </Button>
          </li>)}
      </ul>
      : null
  );
};

Chips.propTypes = {
  chips: PropTypes.array.isRequired,
  setChips: PropTypes.func.isRequired,
};

export default Chips;