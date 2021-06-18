import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingWrapper>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url('//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif') 
    50% 50% no-repeat rgb(249,249,249);
`;

export default Loading;