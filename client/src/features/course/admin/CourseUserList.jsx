import React from 'react';
import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../../user/user.config';
import { Typography } from 'antd';

const CourseUserList = ({
  onCreate,
  onEdit,
  users
}) => {

  const goToCourseUserDetail = userId => {
    const index = users.findIndex(user => user.user?.id === userId);

    onEdit(index);
  };

  const tableActions = [{
    label: 'Add',
    onClick: onCreate
  }];

  const editColumn = {
    title: 'Actions',
    render: (_, row, index) => (
      <Typography.Link onClick={() => goToCourseUserDetail(row?.user?.id)}>
        Edit
      </Typography.Link>
    )
  };

  const columns = [
    ...columnDefinitions.courseUsers,
    editColumn
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        tableActions={tableActions}>
      </DataTable>
    </>
  );
};

export default CourseUserList;