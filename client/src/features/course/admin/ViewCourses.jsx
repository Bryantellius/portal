import React, { useEffect, useMemo, useState } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../course.config';
import { useHistory } from 'react-router-dom';
import PageContent from '../../shared/components/PageContent';
import courseService from '../course.service';

const ViewCourses = () => {
  const history = useHistory();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await courseService.fetchAll();
      setCourses(courses);
    }

    fetchCourses();
  }, []);

  const goToEditRoute = courseId => {
    history.push(`/admin/courses/${ courseId }`);
  }

  const contextActions = [{
    name: 'Delete',
    onClick: selectedRows => {
      selectedRows.forEach(row => {
        courseService.delete(row.id);
      })
    }
  }];
  const rowActions = [{
    name: 'Edit',
    onClick: (row, index) => goToEditRoute(row.id)
  }];

  return (
    <PageContent>
      <PageHeading>
        View/Edit Courses
      </PageHeading>
      <DataTable
        title="View/Edit Courses"
        columns={columnDefinitions}
        data={courses}
        selectableRows
        rowActions={rowActions}
        contextActions={contextActions}
      />
    </PageContent>
  );
};

export default ViewCourses;
