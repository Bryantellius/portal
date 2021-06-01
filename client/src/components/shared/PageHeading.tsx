import React, { FunctionComponent } from 'react';

interface IPageHeadingProps {
  title: string
}

type Props = IPageHeadingProps;

const PageHeading: FunctionComponent<Props> = ({ title }) => {
  return (
    <h1>
      {title}
    </h1>
  );
};

export default PageHeading;
