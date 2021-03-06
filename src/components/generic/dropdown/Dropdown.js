import React from 'react';
import './Dropdown.scss';
import PropTypes from 'prop-types';

/**
 * Create the options
 *
 * @param {array} options
 * @param {bool} allowNone
 */
const createOptions = (options, allowNone) => {
  const none = <option value="" key="-">-</option>;

  if (options.length > 0) {
    let output = allowNone ? [none] : [];

    output = output.concat(options.map((option, index) => {
      if (option.licenses) {
        return <optgroup key={'optgroup-' + index} label={option.translation}>{option.licenses.map(option => {
          return <option value={option.id} key={option.id}>{option.name}</option>
        })}</optgroup>
      }
      return <option value={option.id} key={option.id}>{option.name}</option>
    }));
    return output;
  }

  return none;
};

const Dropdown = ({ selected, options, onChange, allowNone, id }) => (
  <>
    <div className="h5p-hub-icon-arrow-down"></div>
    <select value={selected} onChange={onChange} disabled={options.length === 0} id={id}>
      {createOptions(options, allowNone)}
    </select>
  </>
);

Dropdown.prototypes = {
  selected: PropTypes.string,
  options: PropTypes.array,
  onchange: PropTypes.func.isRequired,
  allowNone: PropTypes.bool,
  id: PropTypes.string.isRequired
};

Dropdown.defaultProps = {
  allowNone: false
};

export default Dropdown;
