import React from 'react';
import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../course.config';
import { Typography } from 'antd';
import { useFormikContext } from 'formik';

const CourseIterationList = ({
  courseIterations,
  onCreate,
  onDelete
}) => {

  const {
    setFieldValue
  } = useFormikContext();

  const editCourseIteration = index => {
    setFieldValue(`courses.${index}.isEditing`, true);
  };

  const tableActions = [{
    label: 'Add',
    onClick: () => {
      onCreate();
    }
  }];

  const selectionActions = [{
    label: 'Delete',
    onClick: selectedKeys => {
      for (let key of selectedKeys) {
        const iterationIndex = courseIterations?.findIndex(course => course.id === key);
        onDelete(iterationIndex);
      }
    }
  }];

  const editColumn = {
    title: 'Actions',
    render: (_, row, index) => (
      <Typography.Link onClick={() => editCourseIteration(index)}>
        Edit
      </Typography.Link>
    )
  };

  const columns = [
    ...columnDefinitions.courseIteration,
    editColumn
  ];


  return (
    <DataTable
      tableActions={tableActions}
      columns={columns}
      data={courseIterations}
      selectionActions={selectionActions} />
  );
};

export default CourseIterationList;