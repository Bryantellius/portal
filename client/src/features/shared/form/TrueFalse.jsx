import React, { useState } from 'react';
import { Radio } from 'formik-antd';

const TrueFalse = ({
  name,
  ...props
}) => {
  const options = [
    { label: 'True', value: true},
    { label: 'False', value: false}
  ];
  return (
    <Radio.Group
      name={name}
      options={options}
      { ...props }
    />
  );
};

export default TrueFalse;