import React from 'react';
import styled from 'styled-components';

const PageContent = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default PageContent;