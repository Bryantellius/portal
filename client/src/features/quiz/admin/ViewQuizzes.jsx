import React, { useEffect, useState } from 'react';
import { columnDefinitions } from '../quiz.config';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/components/DataTable';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import quizService  from '../quiz.service';
import PageContent from '../../shared/components/PageContent';

const ViewQuizzes = () => {
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState([]);
  const history = useHistory();

  const contextActions = [{
    name: 'Delete',
    onClick: selectedRows => {
      selectedRows.forEach(row => quizService.delete(row.id));
    }
  }];

  const rowActions = [{
    name: 'Edit',
    onClick: row => goToEditRoute(row.id)
  }];

  const goToEditRoute = quizId => {
    history.push(`/admin/quizzes/${ quizId }`);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await quizService.fetchAll();
      setQuizzes(quizzes);
    };

    fetchQuizzes();
  }, [dispatch]);

  return (
    <PageContent>
      <PageHeading title="Quizzes" />

      <DataTable
        title="View/Edit Quizzes"
        columns={columnDefinitions}
        data={quizzes}
        selectableRows
        rowActions={rowActions}
        contextActions={contextActions}
      />
    </PageContent>
  );
};

export default ViewQuizzes;