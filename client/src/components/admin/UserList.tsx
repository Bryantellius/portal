import React, { FunctionComponent, useEffect, useState } from 'react';
import ApiClient from '../../utils/apiClient';
import PageHeading from '../shared/PageHeading';
import DataTable from '../shared/dataTable/DataTable';
import { IRole } from '../../common/types';

const UserList: FunctionComponent = () => {
  const [users, setUsers] = useState([]);
  const apiClient = new ApiClient();

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
    formatter: (role: IRole): string => role.title
  }];

  const fetchUsers = async () => {
    const users = await apiClient.get('/user');
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  });

  return (
    <div>
      <PageHeading title="Users" />

      <DataTable
        columns={columnDefinitions}
        data={users} />
    </div>
  );
};

export default UserList;
