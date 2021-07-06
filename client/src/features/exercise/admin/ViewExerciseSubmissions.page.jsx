import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveSubmission, fetchExerciseSubmissions } from '../exercise.slice';
import DataTable from '../../shared/dataTable/DataTable';
import PageHeading from '../../shared/components/PageHeading';
import { useHistory } from 'react-router-dom';
import exerciseConfig from '../exercise.config';
import PageContent from '../../shared/components/PageContent';
import { Typography } from 'antd';

const { exerciseSubmissions: { columnDefinitions } } = exerciseConfig;

const ViewExerciseSubmissionsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submissions = useSelector(state => state.exercise.submissions);

  const reviewSubmission = submissionId => {
    history.push(`/exercise/review/${submissionId}`);
  };

  const actionColumn = {
      title: 'Actions',
      render: (_, row) => (
        <Typography.Link onClick={() => reviewSubmission(row?.id)}>
          Review
        </Typography.Link>
      )
    }
  ;

  const selectionActions = [
    {
      label: 'Approve',
      onClick: async selectedKeys => {
        for (let key of selectedKeys) {
          await dispatch(approveSubmission(key));
        }
      }
    }
  ];

  const columns = [
    ...columnDefinitions,
    actionColumn
  ];

  useEffect(() => {
    const fetchSubmissions = async () => {
      dispatch(fetchExerciseSubmissions());
    };

    fetchSubmissions();
  }, [dispatch]);

  return (
    <PageContent className="page-content">
      <PageHeading>
        Exercise Submissions
      </PageHeading>
      {
        <DataTable
          columns={columns}
          data={submissions}
          loading={!(submissions && submissions?.length)}
          selectionActions={selectionActions} />
      }
    </PageContent>
  );
};

export default ViewExerciseSubmissionsPage;
