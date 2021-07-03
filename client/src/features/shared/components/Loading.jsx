import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  )
};

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const LoadingSpinner = styled(Spin)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  display: block;
  height: 20px;
  width: 20px;
`;

export default Loading;