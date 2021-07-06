import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { approveSubmission } from '../../exercise/exercise.slice';
import DataTable from '../../shared/dataTable/DataTable';
import { useHistory } from 'react-router-dom';
import exerciseService from '../../exercise/exercise.service';
import exerciseConfig from '../../exercise/exercise.config';

const { exerciseSubmissions: { columnDefinitions } } = exerciseConfig;

const CourseUserExerciseSubmissionList = ({
  userId
}) => {
  const [submissions, setSubmissions] = useState([]);
  const history = useHistory();

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
      const submissions = await exerciseService.fetchSubmissionsForUser(userId);

      setSubmissions(submissions);
    };

    fetchSubmissions();
  }, [userId]);

  return (
    <>
      <Typography.Title level={5}>
        Exercise Submissions
      </Typography.Title>

      {
        <DataTable
          columns={columns}
          data={submissions}
          loading={!(submissions && submissions?.length)}
          selectionActions={selectionActions} />
      }
    </>
  );
};

export default CourseUserExerciseSubmissionList;