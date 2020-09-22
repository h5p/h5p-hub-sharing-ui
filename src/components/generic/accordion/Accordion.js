
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
        <span className={'h5p-hub-icon-dropdown' + (open === child.props.id ? ' h5p-hub-open' : '')}></span>
        <button className='h5p-hub-accordion-button'
          onClick={() => handleToggle(child.props.id)}
          aria-expanded={open === child.props.id}>
          <span className='h5p-hub-accordion-header'>{child.props.header}</span>
        </button>
      </dt>
      {open == child.props.id &&
        <dl>
          <div className="h5p-hub-panel-body">
            {child}
          </div>
        </dl>
      }
    </div>
  ));
}

Accordion.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        header: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired
  ).isRequired
}

export default Accordion;