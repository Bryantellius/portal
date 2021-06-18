import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PageActions from '../shared/components/PageActions';
import ActionButton from '../shared/components/ActionButton';
import ApiClient from '../../utils/apiClient';
import ExerciseComments from './ExerciseComments';
import { submitExercise, updateExerciseSubmission } from './exercise.slice';

const Exercise = ({
  id,
  content,
  onNext,
  onSubmitted,
  lecture
}) => {
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const submission = useSelector(state => state.exercise.userSubmissions.find(submission => submission.exerciseId === id));

  const uploadGithubRepo = async () => {
    const exerciseSubmission = {
      repoUrl: githubRepoUrl,
      userId: user.id,
      exerciseId: id
    };

    const updateRepo = async () => {
      dispatch(updateExerciseSubmission({ userId: user.id, exerciseId: id, repoUrl: githubRepoUrl }));
      onSubmitted();
    };

    const submitRepo = async () => {
      dispatch(submitExercise({ userId: user.id, exerciseId: id, repoUrl: githubRepoUrl }));
      onSubmitted();
    };

    const apiClient = new ApiClient();
    await (submission?.id
      ? updateRepo()
      : submitRepo());

    onNext();
  };

  const setRepoUrl = url => {
    setGithubRepoUrl(url);
  };

  return (
    <>
      <Markdown>
        {content}
      </Markdown>

      <Form>
        <Form.Group>
          <Form.Label>
            GitHub Repo URL
          </Form.Label>
          <Form.Control placeholder="http://github.com/your-user/your-repo" type="text" value={submission?.repoUrl || githubRepoUrl} onChange={e => setRepoUrl(e.target.value)} />
        </Form.Group>

        <PageActions>
          <ActionButton variant="primary" onClick={() => uploadGithubRepo()}>
            Submit
          </ActionButton>
        </PageActions>
      </Form>
      {
        submission?.id &&
        <ExerciseComments lectureTitle={lecture?.title} submissionId={submission?.id} />
      }
    </>
  );
};

export default Exercise;
