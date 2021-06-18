import React, { useEffect, useMemo, useState } from 'react';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/components/DataTable';
import { fetchUsers, deleteUser } from '../user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { columnDefinitions } from '../user.config';
import DataTableContextAction from '../../shared/components/DataTableContextAction';

const ViewUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const contextActions = useMemo(() => {
    const deleteUsers = async selectedRows => {
      await Promise.all(selectedRows.map(row => {
        dispatch(deleteUser(row.id));
      }));
    };
    return <DataTableContextAction onClick={deleteUsers} name="Delete Selected" />;
  }, []);

  return (
    <div className="page-content">
      <PageHeading title="Users" />
      {
        <DataTable
          title="View/Edit Users"
          columns={columnDefinitions}
          data={users}
          loading={!(users && users?.length)}
          selectableRows
          editRoute={user => `/admin/users/${ user.id }`}
          contextActions={contextActions}
        />
      }
    </div>
  );
};

export default ViewUsers;
