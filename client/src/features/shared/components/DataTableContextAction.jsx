import React from 'react';
import { Button } from 'react-bootstrap';

const DataTableContextAction = ({
  name,
  onClick
}) => {
  const handleClick = selectedRows => {
    onClick(selectedRows);
  };

  return (
    <Button type="button" size="sm" variant="primary" onClick={handleClick}>{ name }</Button>
  );
};

export default DataTableContextAction;