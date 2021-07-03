import React, { useMemo } from 'react';
import { columnDefinitions } from '../user.config';
import { Table } from 'antd';
import moment from 'moment';

const UserEnrolledCourseList = ({
  user,
  enrolledCourses
}) => {
  return (
    <Table
      columns={columnDefinitions.userEnrolledCourses}
      dataSource={enrolledCourses}
      title={() => 'Enrolled Courses'}
    />
  );
};

export default UserEnrolledCourseList;