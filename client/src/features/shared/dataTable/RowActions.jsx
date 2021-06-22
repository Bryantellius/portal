import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import RowActionButton from './RowActionButton';

const RowActions = ({
  actions,
  row,
  rowIndex,
  ...props
}) => {
  return (
    <div>
      {
        actions && actions.map(action => (
          <RowActionButton key={action.name} onClick={() => action.onClick.call(action, row, rowIndex)} text={action.name} { ...props } />
        ))
      }
    </div>
  );
};

export default RowActions;