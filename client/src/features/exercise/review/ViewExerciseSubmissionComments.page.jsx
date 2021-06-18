import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import appConfig from '../../../config/appConfig';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewExerciseSubmissionCommentsPage = () => {
  const { submissionId } = useParams();
  const submission = useSelector(state => state.exercise.submissions.find(submission => submission.id === parseInt(submissionId)));

  const disqusConfig = {
    identifier: submission?.id,
    title: `${ submission?.exercise?.lecture?.title } Exercise`,
    language: 'en_US',
    url: `${ appConfig.siteUrl }/learn/${ submission?.exercise?.lecture?.id}#exercise`
  };

  return (
    <DiscussionEmbed shortname="truecoders" config={disqusConfig} />
  );
};

export default ViewExerciseSubmissionCommentsPage;