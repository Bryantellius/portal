import React from 'react';
import { Table } from 'react-bootstrap';

const DataTable = ({
  columns,
  data
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        { columns.map(column =>
          <th>{ column.label }</th>
        )}
      </thead>
      <tbody>
        { data.map(item =>
          <tr key={item.id}>
            { columns.map(column =>
              <td key={column.key}>
                { column.formatter
                    ? column.formatter(item[column.key])
                    : item[column.key]?.toString()
                }
              </td>
            )}
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default DataTable;
