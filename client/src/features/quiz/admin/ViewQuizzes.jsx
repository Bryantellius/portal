import React, { useEffect, useMemo } from 'react';
import { columnDefinitions } from '../quiz.config';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/components/DataTable';
import { deleteQuiz, fetchQuizzes } from '../../quiz/quiz.slice';
import DataTableContextAction from '../../shared/components/DataTableContextAction';
import { useDispatch, useSelector } from 'react-redux';

const ViewQuizzes = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector(state => state.quiz.quizzes);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const contextActions = useMemo(() => {
    const deleteQuizzes = async selectedRows => {
      await Promise.all(selectedRows.map(row => {
        dispatch(deleteQuiz(row.id));
      }));
    };
    return <DataTableContextAction onClick={deleteQuizzes} name="Delete Selected" />;
  }, []);

  return (
    <div className="page-content">
      <PageHeading title="Quizzes" />

      <DataTable
        title="View/Edit Quizzes"
        columns={columnDefinitions}
        data={quizzes}
        selectableRows
        editRoute={user => `/admin/quizzes/${ user.id }`}
        contextActions={contextActions}
      />
    </div>
  );
};

export default ViewQuizzes;