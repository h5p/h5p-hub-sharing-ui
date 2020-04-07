import React from 'react';
import './Dropdown.scss';
import PropTypes from 'prop-types';

const Dropdown = ({ selected, options, onChange }) => (
  <>
    <div className="icon-arrow-down"></div>
    <select value={selected} onChange={onChange} disabled={options.length < 1}>>
        {options.length > 0 ?
        options.map(option => {
          return <option value={option.id} key={option.id}>{option.name}</option>
        })
        : <option>-</option>
      }
    </select>
  </>
);

Dropdown.prototypes = {
  selected: PropTypes.string,
  options: PropTypes.array,
  onchange: PropTypes.func.isRequired
}

export default Dropdown;