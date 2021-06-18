import React from 'react';
import PageActions from '../shared/components/PageActions';
import ActionButton from '../shared/components/ActionButton';

const LectureNavButtons = ({
  isBackEnabled,
  isNextEnabled,
  onPrevious,
  onNext
}) => {
  return (
    <PageActions side="left">
      {
        isBackEnabled &&
          <ActionButton variant="secondary" onClick={onPrevious}>
            Back
          </ActionButton>
      }
      {
        isNextEnabled &&
          <ActionButton variant="primary" onClick={onNext}>
            Next
          </ActionButton>
      }
    </PageActions>
  );
};

export default LectureNavButtons;
