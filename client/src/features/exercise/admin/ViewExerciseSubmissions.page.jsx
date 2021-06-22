import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExerciseSubmissions, approveSubmission } from '../exercise.slice';
import DataTable from '../../shared/components/DataTable';
import PageHeading from '../../shared/components/PageHeading';
import { useHistory } from 'react-router-dom';
import exerciseConfig from '../exercise.config';
import PageContent from '../../shared/components/PageContent';
const { exerciseSubmissions: { columnDefinitions }} = exerciseConfig;

const ViewExerciseSubmissionsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submissions = useSelector(state => state.exercise.submissions);

  const reviewSubmission = submissionId => {
    history.push(`/exercise/review/${ submissionId }`);
  };

  const actions = [
    {
      name: 'Review',
      onClick: selectedRow => {
        reviewSubmission(selectedRow.id);
      }
    }
  ]
  const contextActions = [
    {
      name: 'Approve',
      onClick: selectedRows => {
        selectedRows.forEach(row => dispatch(approveSubmission(row.id)));
      }
    }
  ];

  useEffect(() => {
    dispatch(fetchExerciseSubmissions());
  }, [dispatch]);

  return (
    <PageContent className="page-content">
      <PageHeading>
        Exercise Submissions
      </PageHeading>
      {
        <DataTable
          title="Review Exercise Submissions"
          columns={columnDefinitions}
          data={submissions}
          loading={!(submissions && submissions?.length)}
          selectableRows
          contextActions={contextActions}
          rowActions={actions}
        />
      }
    </PageContent>
  );
};

export default ViewExerciseSubmissionsPage;
