import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const RowActionButton = ({
  row,
  rowIndex,
  text,
  onClick,
  ...props
}) => {
  return (
    <Wrapper onClick={() => onClick.call(onClick, row, rowIndex)} { ...props }>
      { text }
    </Wrapper>
  );
};

const Wrapper = styled.button`

`;

export default RowActionButton;