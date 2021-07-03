import React, { useEffect, useState } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../user.config';
import { useHistory } from 'react-router-dom';
import userService from '../user.service';
import PageContent from '../../shared/components/PageContent';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import RowActionButton from '../../shared/dataTable/RowActionButton';

const contextActions = [{
  name: 'Delete',
  icon: faTrashAlt,
  onClick: selectedRows => {
    userService.deleteMultiple(selectedRows);
  }
}];

const ViewUsers = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const goToEditRoute = userId => {
    history.push(`/admin/users/${ userId }`);
  };

  const rowActions = [{
    name: 'Edit',
    onClick: (row, index) => goToEditRoute(row.id)
  }];


  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.fetchAll();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <PageContent className="page-content">
      <PageHeading>
        Users
      </PageHeading>
      {
        <DataTable
          title="View/Edit Users"
          columns={columnDefinitions.users}
          data={users}
          loading={!(users && users?.length)}
          selectableRows
          rowActions={rowActions}
          contextActions={contextActions}
        />
      }
    </PageContent>
  );
};

export default ViewUsers;
