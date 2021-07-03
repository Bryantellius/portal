import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import appConfig from '../../config/appConfig';
import { DiscussionEmbed } from 'disqus-react';

const ExerciseComments = ({
  submissionId,
  lectureTitle
}) => {

  const disqusConfig = {
    identifier: `exercise-submission-${ submissionId }`,
    title: `${ lectureTitle } Exercise`,
    language: 'en_US',
    url: appConfig.siteUrl
  };

  return (
    <Fragment>
      <br />
      <h4>Instructor Feedback</h4>
      <DiscussionEmbed shortname="truecoders" config={disqusConfig} />
    </Fragment>
  );
};

export default ExerciseComments;