import React, { useMemo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { default as DataTableComponent } from 'react-data-table-component';

const DataTable = ({
  title,
  columns,
  data,
  editRoute,
  selectableRows = true,
  onSelectedRowsChange = () => {}
}) => {
  const history = useHistory();

  const goToEditView = entity => {
    history.push(editRoute(entity));
  };

  const editColumn = {
    button: true,
    cell: row => (
      <Button variant="secondary" onClick={() => goToEditView(row)}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </Button>
    )
  };

  const extendedColumns = useMemo(() => [
    ...columns,
    editColumn
  ], [columns, data, editColumn]);

  return (
    <DataTableComponent
      title={title}
      columns={ extendedColumns }
      data={ data }
      selectableRows={ selectableRows }
      onSelectedRowsChange={ onSelectedRowsChange }
      highlightOnHover
    />
  );
};

export default DataTable;