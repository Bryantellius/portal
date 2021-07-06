import React, { useEffect, useState } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../course.config';
import { useHistory } from 'react-router-dom';
import PageContent from '../../shared/components/PageContent';
import courseService from '../course.service';
import { Typography } from 'antd';

const ViewCourses = () => {
  const history = useHistory();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await courseService.fetchAll();
      setCourses(courses);
    };

    fetchCourses();
  }, []);

  const goToEditRoute = courseId => {
    history.push(`/admin/courses/${courseId}`);
  };

  const selectionActions = [{
    label: 'Delete',
    onClick: selectedRows => {
      selectedRows.forEach(row => {
        courseService.delete(row.id);
      });
    }
  }];

  const editCell = {
    title: 'Edit',
    render: (text, row, index) => (
      <Typography.Link onClick={() => goToEditRoute(row.id)}>
        Edit
      </Typography.Link>
    )
  };

  const columns = [
    ...columnDefinitions.courseDefinition,
    editCell
  ];

  return (
    <PageContent>
      <PageHeading>
        View/Edit Courses
      </PageHeading>
      <DataTable
        columns={columns}
        data={courses}
        selectionActions={selectionActions} />
    </PageContent>
  );
};

export default ViewCourses;
