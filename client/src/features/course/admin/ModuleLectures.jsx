import React, { useMemo } from 'react';
import DataTable from '../../shared/dataTable/DataTable';
import { useFormikContext } from 'formik';

const ModuleLectures = ({
  onCreate,
  onRemove,
  moduleIndex,
  lectures
}) => {
  const {
    setFieldValue
  } = useFormikContext();

  const editLecture = lectureIndex => {
    setFieldValue(`modules.${ moduleIndex }.lectures.${ lectureIndex }.isEditing`, true);
  };

  const lectureColumns = useMemo(() => {
    return [
      {
        name: 'Title',
        selector: 'title',
        sortable: false
      }
    ];
  }, []);

  const rowActions = [
    {
      name: 'Edit',
      onClick: (row, index) => {
        editLecture(index);
      }
    }
  ];

  const actions = [
    {
      name: 'Add',
      onClick: onCreate
    }
  ];

  return (
    <>
      <DataTable
        title="Lectures"
        columns={lectureColumns}
        data={lectures}
        actions={actions}
        rowActions={rowActions}
        selectableRows>
      </DataTable>
    </>
  );
};

export default ModuleLectures;