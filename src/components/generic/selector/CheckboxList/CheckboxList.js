import React from 'react';
import PropTypes from 'prop-types';
import DisciplineElement from '../disciplineElement/DisciplineElement';
import { isChecked, descendantsChecked } from '../filters';

import './CheckboxList.scss';

const CheckboxList = React.forwardRef(({
  items,
  errors,
  onChecked,
  checkedParents,
  checked,
  filter,
  focused,
  navigateToChildren,
  parent,
  listRefId,
  getDescendants,
  tabIndex,
  inSearch}, ref) => {

  return (
    <ul
      className="h5p-hub-checkbox-list"
      role='group'
      aria-labelledby={filter.name}
      ref={ref && ref[listRefId]}>

      {items.map(element =>
        <DisciplineElement
          key={parent + element.id}
          errorMessage={errors && errors[element.id]}
          id={element.id}
          label={element.name}
          checked={isChecked(element.id, checked)}
          filter={filter}
          onChecked={onChecked}
          focused={focused == element.id}
          checkboxChildren={!inSearch ? element.children : null}
          navigateToChildren={navigateToChildren}
          parent={parent}
          descendantsChecked={element.children && descendantsChecked(getDescendants(element), checked, checkedParents)}
          ref={ref && ref[element.id]}
          tabIndex={tabIndex}
        />
      )}
    </ul>
  );
});

CheckboxList.displayName = 'CheckboxList';

CheckboxList.propTypes = {
  items: PropTypes.array,
  errors: PropTypes.object,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.string,
  navigateToChildren: PropTypes.func,
  parent: PropTypes.string,
  listRefId: PropTypes.string,
  tabIndex: PropTypes.string,
  inSearch: PropTypes.bool
};

export default CheckboxList;
