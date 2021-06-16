import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 50px;
`;
const PageActions = ({ children, position = 'bottom', side = 'right' }) => {
  return (
    <Wrapper style={{ position: position === 'bottom' ? 'absolute' : 'relative', [position]: 0, [side]: 0, marginBottom: '20px' }}>
      <ButtonGroup className="float-right">
        { children }
      </ButtonGroup>
    </Wrapper>
  );
};

export default PageActions;
