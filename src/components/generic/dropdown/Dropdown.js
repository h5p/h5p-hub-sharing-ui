import React from 'react';
import './Dropdown.scss';

const Dropdown = ({ selected, options, onChange }) => (
  <>
    <div className="icon-dropdown"></div>
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


export default Dropdown;