import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </LoadingWrapper>
  )
};

const LoadingWrapper = styled(Spinner)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: block;
`;

export default Loading;