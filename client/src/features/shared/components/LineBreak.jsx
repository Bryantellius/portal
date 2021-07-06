import React from 'react';

const LineBreak = ({
  style,
  ...props
}) => {
  return (
    <br
      style={{
        clear: 'both',
        ...style
      }} {...props} />
  );
};

export default LineBreak;