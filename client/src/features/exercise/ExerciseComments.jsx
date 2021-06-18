import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appConfig from '../../config/appConfig';
import { DiscussionEmbed } from 'disqus-react';

const ExerciseComments = ({
  submissionId,
  lectureTitle
}) => {
  const submission = useSelector(state => state.exercise.submissions.find(submission => submission.id === parseInt(submissionId)));

  const disqusConfig = {
    identifier: submissionId,
    title: `${ lectureTitle } Exercise`,
    language: 'en_US',
    url: `${ appConfig.siteUrl }/learn/${ submission?.exercise?.lecture?.id}#exercise`
  };

  return (
    <Fragment>
      <br />
      <h4>Comments from Instructor</h4>
      <DiscussionEmbed shortname="truecoders" config={disqusConfig} />
    </Fragment>
  );
};

export default ExerciseComments;