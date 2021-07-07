import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import styled from 'styled-components';

const ActionButton = ({
  size = 'md',
  icon,
  children,
  type = 'primary',
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      size={size}
      {...props}>
      {icon &&
      <FontAwesomeIcon icon={icon} />
      }
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

export default ActionButton;