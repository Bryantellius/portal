import React, { useEffect, useState } from 'react';
import ApiClient from '../../../utils/apiClient';
import PageHeading from '../../../components/shared/PageHeading';
import DataTable from '../../../components/shared/DataTable';
import moment from 'moment';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);

  const columnDefinitions = [{
    name: 'Title',
    selector: 'title',
    sortable: true,
    grow: 2
  }, {
    name: 'Type',
    selector: 'type',
    sortable: true
  }, {
    name: 'Start Date',
    selector: 'startDate',
    format: row => moment(row.startDate).format('MM/DD/YYYY'),
  }, {
    name: 'End Date',
    selector: 'endDate',
    format: row => moment(row.startDate).format('MM/DD/YYYY')
  }];

  useEffect(() => {
    const fetchCourses = async () => {
      const apiClient = new ApiClient();
      const courses = await apiClient.get('/course');
      setCourses(courses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="page-content">
      <PageHeading title="Courses" />

      <DataTable
        title="View/Edit Courses"
        columns={columnDefinitions}
        data={courses}
        selectableRows
        editRoute={user => `/admin/courses/${ user.id }`}
      />
    </div>
  );
};

export default ViewCourses;
