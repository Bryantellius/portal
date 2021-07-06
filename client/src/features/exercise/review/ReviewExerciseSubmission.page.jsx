import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageActions from '../../shared/components/PageActions';
import ActionButton from '../../shared/components/ActionButton';
import { approveSubmission } from '../exercise.slice';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../shared/components/PageContent';
import PageHeading from '../../shared/components/PageHeading';
import exerciseService from '../exercise.service';
import { Typography } from 'antd';
import ExerciseComments from '../ExerciseComments';

const ReviewExerciseSubmissionPage = ({
  exercise
}) => {
  const { submissionId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [submission, setSubmission] = useState();

  const approve = () => {
    dispatch(approveSubmission(submissionId));
    history.push(`/admin/exercise/review`);
  };

  useEffect(() => {
    const loadSubmission = async () => {
      const submission = await exerciseService.fetchExerciseSubmission(submissionId);

      setSubmission(submission);
    };

    loadSubmission();
  }, [submissionId]);


  return (
    <PageContent>
      <PageHeading>
        Review Submission
      </PageHeading>
      <section>
        <dl>
          <dt>
            Student
          </dt>
          <dd>
            {submission?.user?.firstName} {submission?.user?.lastName}
          </dd>
          <dt>
            Github Repo
          </dt>
          <dd>
            <Typography.Link
              target="_blank"
              rel="noreferrer"
              href={submission?.repoUrl}>
              {submission?.repoUrl}
            </Typography.Link>
          </dd>
        </dl>
      </section>

      <h2>Comments</h2>

      <ExerciseComments
        exercise={submission?.exercise}
        comments={submission?.exercise?.exerciseComments} />

      <PageActions side="right">
        <ActionButton
          onClick={approve}
          icon={faCheckCircle}>
          Approve
        </ActionButton>
      </PageActions>
    </PageContent>
  );
};
export default ReviewExerciseSubmissionPage;