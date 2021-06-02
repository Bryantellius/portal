import React, { useEffect, useState } from 'react';
import ApiClient from '../../../utils/apiClient';
import PageHeading from '../../../components/shared/PageHeading';
import DataTable from '../../../components/shared/dataTable/DataTable';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const columnDefinitions = [{
    key: 'id',
    label: 'ID'
  }, {
    key: 'firstName',
    label: 'First Name'
  }, {
    key: 'lastName',
    label: 'Last Name'
  }, {
    key: 'email',
    label: 'Email'
  }, {
    key: 'role',
    label: 'Role',
    formatter: role => role.title
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
    <div>
      <PageHeading title="Users" />

      <DataTable
        columns={columnDefinitions}
        data={users} />
    </div>
  );
};

export default ViewUsers;
