import React, { useState, useEffect } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModules } from '../module.slice';

const ViewModules = () => {
  const dispatch = useDispatch();
  const modules = useSelector(state => state.module.modules);

  const columnDefinitions = [{
    name: 'ID',
    selector: 'id',
    sortable: true,
    grow: 0
  }, {
    name: 'Title',
    selector: 'title',
    sortable: true
  }, {
    name: 'Created At',
    selector: 'createdAt',
    sortable: true
  }];

  useEffect(() => {
    dispatch(fetchModules());
  }, [dispatch]);

  return (
    <div className="page-content">
      <PageHeading title="Modules" />

      <DataTable
        title="View/Edit Modules"
        columns={columnDefinitions}
        data={modules}
        selectableRows
        editRoute={module => `/admin/modules/${ module.id }`}
      />
    </div>
  );
};

export default ViewModules;
