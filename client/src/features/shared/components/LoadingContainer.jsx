import React from 'react';
import Loading from './Loading';

const LoadingContainer = ({ isLoading, children }) => {
  return (
    isLoading
      ? <Loading />
      : [ children ]
  );
};

export default LoadingContainer;