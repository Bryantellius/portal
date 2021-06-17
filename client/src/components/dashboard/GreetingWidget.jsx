import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { useSelector } from 'react-redux';

const GreetingWidget = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <Card className="shadow bg-info text-light">
      <Card.Body>
        <Card.Title>
          <p className="h4 h-100 text-white">Welcome back, {user?.firstName}!</p>
        </Card.Title>
        <Card.Subtitle className="text-white">
          <strong>Member Since: </strong>
          <span className="text-highlight-white">
            {moment().format("MMM DD yyyy")}
          </span>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default GreetingWidget;