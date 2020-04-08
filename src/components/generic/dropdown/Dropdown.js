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
  
    output = output.concat(options.map(option => {
      return <option value={option.id} key={option.id}>{option.name}</option>
    }));
    return output;
  }

  return none;
};

const Dropdown = ({ selected, options, onChange, allowNone }) => (
  <>
    <div className="icon-arrow-down"></div>
    <select value={selected} onChange={onChange} disabled={options.length === 0}>
      {createOptions(options, allowNone)}
    </select>
  </>
);

Dropdown.prototypes = {
  selected: PropTypes.string,
  options: PropTypes.array,
  onchange: PropTypes.func.isRequired,
  allowNone: PropTypes.bool
};

Dropdown.defaultProps = {
  allowNone: false
};

export default Dropdown;