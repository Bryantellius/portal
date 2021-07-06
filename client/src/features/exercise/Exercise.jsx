import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseComments from './ExerciseComments';
import VideoPlaylist from '../video/VideoPlaylist';
import { Button, Card, Form, Input, notification, Rate, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { submitExercise } from './exercise.slice';
import LineBreak from '../shared/components/LineBreak';
import exerciseService from './exercise.service';

const Exercise = ({
  exercise,
  onNext
}) => {
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const dispatch = useDispatch();
  const lecture = useSelector(state => state.lecture.currentLecture);
  const user = useSelector(state => state.auth.user);
  const submission = useSelector(state =>
    state.exercise?.userSubmissions
    ?.filter(submission => submission.exerciseId === lecture?.exercise?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]);

  const rateExercise = async rating => {
    await exerciseService.addExerciseRating(user?.id, exercise?.id, rating);
  };

  const uploadGithubRepo = async () => {
    const exerciseSubmission = {
      repoUrl: githubRepoUrl,
      userId: user.id,
      exerciseId: exercise.id
    };

    if (submission && submission.id) {
      exerciseSubmission.id = submission.id;
    }

    await dispatch(submitExercise(exerciseSubmission));
    await notification.success({
      message: 'Exercise Submitted',
      description: 'Your exercise has been submitted and will be reviewed shortly.'
    });
  };

  return (
    <>
      {
        exercise.videos?.length > 0 && <VideoPlaylist videos={exercise.videos} />
      }
      <Markdown>
        {exercise.content}
      </Markdown>

      <Card>
        <Form
          initialValues={{
            repoUrl: submission?.repoUrl
          }}>
          <Typography.Title level={4}>
            Enter the URL for your repo
          </Typography.Title>
          <Form.Item
            label="Github Repo URL"
            name="repoUrl">
            <Input
              placeholder="github.com/<username>/<repo>"
              type="text"
              onChange={e => setGithubRepoUrl(e.target.value)} />
          </Form.Item>

          <Button
            type="primary"
            className="float-right"
            htmlType="submit"
            onClick={uploadGithubRepo}
            icon={<CheckOutlined />}
            size="large"
            shape="round">
            Submit Exercise
          </Button>
        </Form>
      </Card>

      <LineBreak />
      {
        // submission?.id &&
        <ExerciseComments
          exercise={exercise}
          comments={exercise.exerciseComments} />
      }

      <LineBreak />

      <Card title="Rate this Exercise">
        <Rate onChange={rateExercise} />
      </Card>
    </>
  );
};

export default Exercise;
