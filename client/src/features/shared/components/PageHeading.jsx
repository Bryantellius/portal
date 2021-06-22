import React from 'react';

const PageHeading = ({ children, ...props }) => {
  return (
    <h1 { ...props }>
      {children}
    </h1>
  );
};

export default PageHeading;
