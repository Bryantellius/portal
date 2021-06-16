import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const ActionButton = ({ children, icon, onClick, ...props }) => {
  return (
    <Button {...props} onClick={onClick}>
      { icon &&
        <FontAwesomeIcon icon={icon} />
      }
      {children}
    </Button>
  );
};

export default ActionButton;
