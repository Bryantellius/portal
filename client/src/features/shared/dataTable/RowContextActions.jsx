import React from 'react';
import styled from 'styled-components';
import ContextActionButton from './ContextActionButton';

const RowContextActions = ({
  actions,
  selectedRows
}) => {
  return (
    <ContextActionsWrapper>
      {
        actions && actions.map(action => (
          <ContextActionButton
            key={action.name}
            text={action.name}
            icon={action.icon}
            onClick={() => {
              action.onClick.call(action.onClick, selectedRows);
            }}
          />
        ))
      }
    </ContextActionsWrapper>
  );
};

const ContextActionsWrapper = styled.div`

`;

export default RowContextActions;