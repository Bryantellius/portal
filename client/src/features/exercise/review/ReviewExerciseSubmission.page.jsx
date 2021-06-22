import React, { useEffect, useMemo } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import appConfig from '../../../config/appConfig';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PageActions from '../../shared/components/PageActions';
import ActionButton from '../../shared/components/ActionButton';
import { approveSubmission, fetchExerciseSubmission } from '../exercise.slice';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../shared/components/PageContent';
import PageHeading from '../../shared/components/PageHeading';

const ReviewExerciseSubmissionPage = () => {
  const { submissionId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const submission = useSelector(state => state.exercise.submission);

  const disqusConfig = useMemo(() => {
    return {
      identifier: submissionId,
      title: `${ submission?.exercise?.lecture?.title } Exercise`,
      language: 'en_US',
      url: `${ appConfig.siteUrl }/learn`
    };
  }, [submission]);

  const approve = () => {
    dispatch(approveSubmission(submissionId));
    history.push(`/admin/exercise/review`);
  };

  useEffect(() => {
    if (submissionId) {
      dispatch(fetchExerciseSubmission(submissionId));
    }
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
            { submission?.user?.firstName } { submission?.user?.lastName }
          </dd>
          <dt>
            Github Repo
          </dt>
          <dd>
            <a href={ submission?.repoUrl } target="_blank" className="link">
              { submission?.repoUrl }
            </a>
          </dd>
        </dl>
      </section>

      <h2>Comments</h2>
      <DiscussionEmbed shortname="truecoders" config={ disqusConfig } />

      <PageActions side="right">
        <ActionButton onClick={ approve } icon={ faCheckCircle }>
          Approve
        </ActionButton>
      </PageActions>
    </PageContent>
  );
};
export default ReviewExerciseSubmissionPage;