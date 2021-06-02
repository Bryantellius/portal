import React from 'react';
import { default as DataTableComponent } from 'react-data-table-component';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

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

  const deleteEntity = () => {
    //todo: this
  }

  const actionsColumn = {
    sortable: false,
    button: true,
    grow: 1,
    cell: row => (
      <>
        <Button className="btn-sm" variant="secondary" onClick={ e => goToEditView(row) }>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button className="btn-sm" variant="danger" onClick={ e => deleteEntity(row) }>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </>
    )
  };
  const extendedColumns = [
    ...columns,
    actionsColumn
  ];

  return (
    <DataTableComponent
      title={ title }
      columns={ extendedColumns }
      data={ data }
      selectableRows={ selectableRows }
      onSelectedRowsChange={ onSelectedRowsChange }
    />
  );
};

export default DataTable;