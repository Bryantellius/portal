import React, { useState, useEffect } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/dataTable/DataTable';
import moduleService from '../module.service';
import PageContent from '../../shared/components/PageContent';
import { columnDefinitions } from '../module.config';

const ViewModules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      const modules = await moduleService.fetchAll();
      setModules(modules);
    };

    fetchModules();
  }, []);

  return (
    <PageContent className="page-content">
      <PageHeading title="Modules" />

      <DataTable
        title="View/Edit Modules"
        columns={columnDefinitions}
        data={modules}
        selectableRows
      />
    </PageContent>
  );
};

export default ViewModules;
