import React from 'react';
import { columnDefinitions } from '../user.config';
import { Table } from 'antd';

const UserCompletedCourseList = ({
  completedCourses
}) => {
  return (
    <Table
      columns={columnDefinitions.userCompletedCourses}
      dataSource={completedCourses}
      title={() => 'Completed Courses'}
    />
  );
};

export default UserCompletedCourseList;