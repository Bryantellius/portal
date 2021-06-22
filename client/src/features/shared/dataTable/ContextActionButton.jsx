import React from 'react';
import ActionButton from '../components/ActionButton';
import styled from 'styled-components';

const ContextActionButton = ({
  text,
  ...props
}) => {
  return (
    <StyledActionButton { ...props }>
      { text }
    </StyledActionButton>
  )
}

const StyledActionButton = styled(ActionButton)`

`;

export default ContextActionButton;