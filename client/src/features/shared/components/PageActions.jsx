import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 50px;
  position: absolute;
`;

const PageActions = ({ vertical = false, position, children, side = 'right', className, ...props }) => {
  return (
    <Wrapper style={{[position]: 0, [side]: 0, marginBottom: '20px' }} {...props}>
      <ButtonGroup vertical={vertical}>
        { children }
      </ButtonGroup>
    </Wrapper>
  );
};

export default PageActions;
