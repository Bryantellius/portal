import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

const FormSubmitButton = ({
  text,
  onClick,
  size = 'large',
  icon = <CheckOutlined />,
  children,
  ...props
}) => {
  return (
    <SubmitButton
      type="primary"
      htmlType="submit"
      size={size}
      icon={icon}
      onClick={onClick}
      {...props}>
      {text}
      {children}
    </SubmitButton>
  );
};

const SubmitButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  right: 0;
`
export default FormSubmitButton;