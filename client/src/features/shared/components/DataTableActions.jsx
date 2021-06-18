import React from 'react';
import { ButtonGroup } from 'react-bootstrap';

const DataTableActions = ({ children }) => {
  return (
    <ButtonGroup size="sm" className="data-table-actions">
      { children }
    </ButtonGroup>
  );
};

export default DataTableActions;
