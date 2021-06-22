import React from 'react';
import { columnDefinitions } from '../user.config';
import DataTable from '../../shared/components/DataTable';

const UserEnrolledCourseList = ({
  user,
  courses
}) => {

  return (
    <DataTable
      title="Enrolled Courses"
      columns={columnDefinitions.userEnrolledCourses}
      data={courses}
      selectableRows
      // rowActions={rowActions}
      // contextActions={contextActions}
    />
  );
};

export default UserEnrolledCourseList;