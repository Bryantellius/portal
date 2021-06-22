import React, { useMemo, useState } from 'react';
import { default as DataTableComponent } from 'react-data-table-component';
import Loading from './Loading';
import RowContextActions from '../dataTable/RowContextActions';
import TableActions from '../dataTable/TableActions';
import RowActionButton from '../dataTable/RowActionButton';
import { ButtonGroup } from 'react-bootstrap';
import RowActionsCell from '../dataTable/RowActionsCell';

const DataTable = ({
  title,
  columns,
  data,
  selectableRows = true,
  loading,
  onEdit,
  onDelete,
  onCreate,
  actions,
  rowActions = [],
  contextActions = []
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const extendedColumns = [
    ...columns,
    {
      name: '',
      cell: (row, rowIndex) => <RowActionsCell actions={rowActions} row={row} rowIndex={rowIndex} />
    }
  ];


  return (
    <DataTableComponent
      responsive
      progressPending={loading}
      progressComponent={Loading}
      title={title}
      columns={ extendedColumns }
      data={ data }
      selectableRows={ selectableRows }
      onSelectedRowsChange={ handleSelectedRowsChange }
      highlightOnHover
      actions={<TableActions actions={actions} selectedRows={selectedRows} />}
      contextActions={<RowContextActions actions={contextActions} selectedRows={selectedRows} />}
    />
  );
};

export default DataTable;