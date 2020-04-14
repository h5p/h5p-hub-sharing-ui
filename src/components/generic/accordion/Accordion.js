
import React from 'react';
import PropTypes from 'prop-types';

import './Accordion.scss';

const Accordion = ({ children }) => {
  const [open, setOpen] = React.useState('');
  
  /**
   * Toggle which accordion is open
   * @param  {string} id
   */
  const handleToggle = (id) => {
    setOpen(id === open ? '': id);
  }

  return children.map(child => (
    <div key={child.props.id}>
      <dt className="h5p-hub-accordion-heading">
        <span className={'icon-dropdown' + (open === child.props.id ? ' open' : '')}></span>
        <button className='accordion-button'
          onClick={() => handleToggle(child.props.id)}
          aria-expanded={open === child.props.id}>
          <span className='accordion-header'>{child.props.header}</span>
        </button>
      </dt>
      {open == child.props.id &&
        <dl>
        <div className="panel-body">
          {child}
        </div>
      </dl>
      }
    </div>
  ));
}

Accordion.propTypes = {
  children: PropTypes.shape({
    id: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired
  })
}

export default Accordion;