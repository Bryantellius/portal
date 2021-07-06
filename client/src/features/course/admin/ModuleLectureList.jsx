import React from 'react';
import { useFormikContext } from 'formik';
import { Typography } from 'antd';
import DataTable from '../../shared/dataTable/DataTable';

const ModuleLectureList = ({
  onCreate,
  onRemove,
  moduleIndex,
  lectures
}) => {
  const {
    setFieldValue
  } = useFormikContext();

  const editLecture = lectureId => {
    const index = lectures.findIndex(lecture => lecture.id === lectureId);
    setFieldValue(`modules.${moduleIndex}.lectures.${index}.isEditing`, true);
  };

  const lectureColumns = [
    {
      title: 'Title',
      dataIndex: 'title'
    }
  ];

  const editColumn = {
    title: 'Actions',
    render: (_, row, index) => (
      <Typography.Link
        onClick={() => editLecture(row.id)}>
        Edit
      </Typography.Link>
    )
  };

  const tableActions = [
    {
      name: 'Add',
      onClick: onCreate
    }
  ];

  const selectionActions = [
    {
      label: 'Delete',
      onClick: selectedKeys => {
        for (let key of selectedKeys) {
          onRemove(key);
        }
      }
    }
  ];

  const columns = [
    ...lectureColumns,
    editColumn
  ];

  return (
    <>
      <Typography.Title level={2}>
        Lessons
      </Typography.Title>

      <DataTable
        columns={columns}
        data={lectures}
        tableActions={tableActions}
        selectionActions={selectionActions}>
      </DataTable>
    </>
  );
};

export default ModuleLectureList;