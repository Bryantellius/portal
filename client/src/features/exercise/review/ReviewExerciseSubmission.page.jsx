import React, { useEffect, useMemo, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import appConfig from '../../../config/appConfig';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PageActions from '../../shared/components/PageActions';
import ActionButton from '../../shared/components/ActionButton';
import { approveSubmission } from '../exercise.slice';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../shared/components/PageContent';
import PageHeading from '../../shared/components/PageHeading';
import exerciseService from '../exercise.service';

const ReviewExerciseSubmissionPage = () => {
  const { submissionId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [submission, setSubmission] = useState();

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