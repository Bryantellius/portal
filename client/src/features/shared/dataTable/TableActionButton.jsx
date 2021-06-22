import React from 'react';
import ActionButton from '../components/ActionButton';
import styled from 'styled-components';

const TableActionButton = ({
  text,
  ...props
}) => {
  return (
    <StyledActionButton className="table-action-button" { ...props }>
      { text }
    </StyledActionButton>
  );
};

const StyledActionButton = styled(ActionButton)`
  
`;

export default TableActionButton;