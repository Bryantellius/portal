import React, { useMemo, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { default as DataTableComponent } from 'react-data-table-component';
import Loading from './Loading';

const DataTable = ({
  title,
  columns,
  data,
  editRoute,
  selectableRows = true,
    loading,
  actions,
  contextActions,
  canDelete = true
}) => {
  const history = useHistory();
  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const extendedColumns = useMemo(() => !!editRoute
    ? [
      ...columns,
      editColumn
    ]
    : columns, [columns, data, editColumn]);

  return (
    <DataTableComponent
      progressPending={loading}
      progressComponent={Loading}
      title={title}
      columns={ extendedColumns }
      data={ data }
      selectableRows={ selectableRows }
      onSelectedRowsChange={ handleSelectedRowsChange }
      highlightOnHover
      actions={actions}
      contextActions={contextActions}
    />
  );
};

export default DataTable;