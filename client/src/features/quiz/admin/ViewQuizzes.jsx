import React, { useEffect, useState } from 'react';
import { columnDefinitions } from '../quiz.config';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/dataTable/DataTable';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import quizService from '../quiz.service';
import PageContent from '../../shared/components/PageContent';
import { Typography } from 'antd';

const ViewQuizzes = () => {
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState([]);
  const history = useHistory();

  const goToEditRoute = quizId => {
    history.push(`/admin/quizzes/${quizId}`);
  };

  const selectionActions = [{
    name: 'Delete',
    onClick: selectedRows => {
      selectedRows.forEach(row => quizService.delete(row.id));
    }
  }];

  const editColumn = {
    title: 'Actions',
    render: (_, row) => (
      <Typography.Link onClick={() => goToEditRoute(row.id)}>
        Edit
      </Typography.Link>
    )
  };

  const columns = [
    ...columnDefinitions,
    editColumn
  ];

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
        columns={columns}
        data={quizzes}
        selectionActions={selectionActions} />
    </PageContent>
  );
};

export default ViewQuizzes;