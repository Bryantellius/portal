import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const ActionButton = ({
  size = "md",
  icon,
  children,
  ...props
}) => {
  return (
    <StyledButton
      type="button"
      size={size}
      {...props}>
      { icon &&
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