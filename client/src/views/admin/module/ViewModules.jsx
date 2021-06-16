import React, { useState, useEffect } from 'react';
import ApiClient from '../../../utils/apiClient';
import PageHeading from '../../../components/shared/PageHeading';
import DataTable from '../../../components/shared/DataTable';

const ViewModules = () => {
  const [modules, setModules] = useState([]);

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
    const fetchModules = async () => {
      const apiClient = new ApiClient();
      const modules = await apiClient.get('/module');
      setModules(modules);
    };

    fetchModules();
  }, []);
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
