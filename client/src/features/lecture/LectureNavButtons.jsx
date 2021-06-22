import React from 'react';
import PageActions from '../shared/components/PageActions';
import ActionButton from '../shared/components/ActionButton';
import LineBreak from '../shared/components/LineBreak';
import styled from 'styled-components';

const LectureNavButtons = ({
  isBackEnabled,
  isNextEnabled,
  onPrevious,
  onNext,
  prevLabel = 'Back',
  nextLabel = 'Next'
}) => {
  return (
    <Wrapper>
      <LineBreak />
        {
          isBackEnabled &&
            <ActionButton variant="secondary" onClick={onPrevious}>
              { prevLabel }
            </ActionButton>
        }
        {
          isNextEnabled &&
            <ActionButton variant="primary" onClick={onNext}>
              { nextLabel }
            </ActionButton>
        }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  min-height: 50px;
`;

export default LectureNavButtons;
