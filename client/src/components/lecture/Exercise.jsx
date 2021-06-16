import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PageActions from '../shared/PageActions';
import ActionButton from '../shared/ActionButton';
import ApiClient from '../../utils/apiClient';

const Exercise = ({
  id,
  content,
  onNext,
  onSubmitted
}) => {
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [submissionId, setSubmissionId] = useState(null);
  const user = useSelector(state => state.auth.user);

  const uploadGithubRepo = async () => {
    const exerciseSubmission = {
      repoUrl: githubRepoUrl,
      userId: user.id,
      exerciseId: id
    };

    const updateRepo = async () => {
      const submission = await apiClient.put(`/exercise/${ submissionId }`, exerciseSubmission);
      setSubmissionId(submission.id);
      onSubmitted();
    };

    const submitRepo = async () => {
      const submission = await apiClient.post(`/exercise`, exerciseSubmission);
      setSubmissionId(submission.id);
      onSubmitted();
    };

    const apiClient = new ApiClient();
    await (submissionId
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
          <Form.Control placeholder="http://github.com/your-user/your-repo" type="text" value={githubRepoUrl} onChange={e => setRepoUrl(e.target.value)} />
        </Form.Group>

        <PageActions>
          <ActionButton variant="primary" onClick={() => uploadGithubRepo()}>
            Submit
          </ActionButton>
        </PageActions>
      </Form>
    </>
  );
};

export default Exercise;
