import React from 'react';
import RowActionButton from './RowActionButton';

const RowActionsCell = ({
  actions,
  row,
  rowIndex
}) => {
  return (
    <div>
      {
        actions.map(action => (
          <RowActionButton row={row} rowIndex={rowIndex} action={ action } text={ action.name } onClick={ action.onClick } />
        ))
      }
    </div>
  );
};

export default RowActionsCell;