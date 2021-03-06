import React from 'react';
import PropTypes from 'prop-types';

import './SearchField.scss';

const SearchField = React.forwardRef(({
  value,
  onSearch,
  onNavigateVertical,
  onSelect,
  placeholder,
  onClick,
  onNavigateSideway,
  onFocus,
  inSearch,
  dictionary,
  handleClearSearch,
  closeDropdown }, ref) => {

  /**
   * Search for each time a letter is typed
   * @param  {InputEvent} event
   */
  const handleInput = (event) => {
    const input = event.target;
    onSearch(input.value);
  };

  /**
   * @param  {KeyboardEvent} event
   */
  const handleKeyDown = (event) => {
    // Allow quick selecting from the list while typing
    switch (event.key) {
      case 'ArrowUp': // Up
        onNavigateVertical(-1);
        event.preventDefault();
        break;

      case 'ArrowDown': // Down
        onNavigateVertical(1);
        event.preventDefault();
        break;

      case 'ArrowRight':
        if (!inSearch) {
          onNavigateSideway(1);
          event.preventDefault();
        }
        break;

      case 'ArrowLeft':
        if (!inSearch) {
          onNavigateSideway(-1);
          event.preventDefault();
        }
        break;

      case 'Enter': // Enter
        // Select highlighted
        onSelect();
        event.preventDefault();
        break;

      case 'Escape':
        closeDropdown();
        event.preventDefault();
        break;
    }
  };

  return (
    <div onMouseDown={onClick} className="h5p-hub-search-button" role="button" aria-label={dictionary.dropdownButton}>

      <div className="h5p-hub-search-field" role="search">
        <input id="h5p-hub-filter-search-bar"
          type="text"
          value={value}
          placeholder={placeholder}
          ref={ref}
          onKeyDown={event => handleKeyDown(event)}
          onChange={handleInput}
          onFocus={onFocus}
          autoComplete="off"
        >
        </input>
        <div className="h5p-hub-icon-arrow" />
      </div>
      {value.length > 0 &&
        <button onClick={handleClearSearch} className="h5p-hub-clear-button" />
      }
    </div>
  );
});

SearchField.displayName = 'SearchField';

SearchField.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onNavigateVertical: PropTypes.func.isRequired,
  onNavigateSideway: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  inSearch: PropTypes.bool,
  handleClearSearch: PropTypes.func.isRequired,
};

SearchField.defaultProps = {
  onNavigateVertical: () => { },
  onNavigateSideway: () => { },
  onSelect: () => { }
};

export default SearchField;
