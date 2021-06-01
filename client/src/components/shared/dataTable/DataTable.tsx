import React, { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';
import ColumnDefinition from '../../../common/classes/dataTable/columnDefinition';

interface IDataTableProps {
  columns: ColumnDefinition[],
  data: any[]
}

type Props = IDataTableProps;

const DataTable: FunctionComponent<Props> = ({
  columns,
  data
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        { columns.map(column =>
          <th>{column.label}</th>
        )}
      </thead>
      <tbody>
        { data.map(item =>
          <tr>
            { columns.map(column =>
              <td>
                {(column.formatter as (val: string) => string)(item[column.key]) }
              </td>
            )}
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default DataTable;
