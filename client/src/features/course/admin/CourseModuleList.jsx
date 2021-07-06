import React from 'react';
import DataTable from '../../shared/dataTable/DataTable';
import { Typography } from 'antd';
import { columnDefinitions } from '../../module/module.config';

const CourseModuleList = ({
  onCreate,
  onRemove,
  onEdit,
  modules
}) => {

  const editCell = {
    title: 'Actions',
    render: (_, record, index) => {
      return (
        <Typography.Link onClick={() => onEdit.call(onEdit, index)}>
          Edit
        </Typography.Link>
      );
    }
  };

  const tableActions = [{
    label: 'Add',
    onClick: () => onCreate()
  }];

  const selectionActions = [{
    label: 'Delete',
    onClick: async selectedKeys => {
      for (let key of selectedKeys) {
        const index = modules.findIndex(module => module.id === key);
        onRemove(index);
      }
    }
  }];

  const columns = [
    ...columnDefinitions,
    editCell
  ];

  return (
    <DataTable
      columns={columns}
      selectionActions={selectionActions}
      tableActions={tableActions}
      data={modules} />
  );
};

export default CourseModuleList;