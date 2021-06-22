import React from 'react';
import TableActionButton from './TableActionButton';

const TableActions = ({
  actions,
  selectedRows
}) => {
  return (
    <>
      { actions && actions.map(action =>
        <TableActionButton key={action.name} onClick={() => action.onClick.call(action.onClick, selectedRows)} text={ action.name } />)}
    </>
  )
};

export default TableActions;