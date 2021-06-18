import React, { useEffect, useMemo, useState } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, deleteCourse } from '../course.slice';
import { columnDefinitions } from '../course.config';
import DataTableContextAction from '../../shared/components/DataTableContextAction';

const ViewCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.course.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const contextActions = useMemo(() => {
    const deleteCourses = async selectedRows => {
      await Promise.all(selectedRows.map(row => {
        dispatch(deleteCourse(row.id));
      }));
    };
    return <DataTableContextAction onClick={deleteCourses} name="Delete Selected" />;
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
        contextActions={contextActions}
      />
    </div>
  );
};

export default ViewCourses;
