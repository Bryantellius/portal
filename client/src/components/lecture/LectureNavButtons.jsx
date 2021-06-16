import React from 'react';
import PageActions from '../shared/PageActions';
import ActionButton from '../shared/ActionButton';

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
