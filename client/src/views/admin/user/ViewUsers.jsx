import React, { useEffect, useState } from 'react';
import ApiClient from '../../../utils/apiClient';
import PageHeading from '../../../components/shared/PageHeading';
import DataTable from '../../../components/shared/DataTable';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const columnDefinitions = [{
    name: 'ID',
    selector: 'id',
    sortable: true,
    grow: 0
  }, {
    name: 'First Name',
    selector: 'firstName',
    sortable: true
  }, {
    name: 'Last Name',
    selector: 'lastName',
    sortable: true
  }, {
    name: 'Email',
    selector: 'email',
    sortable: true
  }, {
    name: 'Role',
    selector: 'role',
    sortable: true,
    format (row) {
      return row.role.title
    }
  }];

  useEffect(() => {
    const fetchUsers = async () => {
      const apiClient = new ApiClient();
      const users = await apiClient.get('/user');
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div class="page-content">
      <PageHeading title="Users" />

      <DataTable
        title="View/Edit Users"
        columns={columnDefinitions}
        data={users}
        selectableRows
        editRoute={user => `/admin/users/${ user.id }`}
      />
    </div>
  );
};

export default ViewUsers;
