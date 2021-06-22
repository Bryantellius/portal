import React from 'react';
import { columnDefinitions } from '../user.config';
import DataTable from '../../shared/components/DataTable';
import RowActionButton from '../../shared/dataTable/RowActionButton';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';





const UserCompletedCourseList = ({
  user,
  courses
}) => {
  const history = useHistory();
  const goToEditRoute = (courseId) => {
    history.push(`/admin/users/${ user?.Id }/course/${ courseId }`);
  };

  const rowActions = [{
    name: '',
    cell: row => (
      <RowActionButton
        text="Edit"
        icon={faPencilAlt}
        onClick={() => goToEditRoute(row.id)}>
        Edit
      </RowActionButton>
    )
  }];
  return (
    <DataTable
      columns={columnDefinitions.userCompletedCourses}
      data={courses}
      selectableRows
      rowActions={rowActions}
    />
  );
};

export default UserCompletedCourseList;