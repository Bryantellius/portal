import React from 'react';
import { Card } from 'react-bootstrap';

const TutoringWidget = () => {
  return (
    <Card className="shadow dashboard-widget bg-light-success text-dark">
      <Card.Img
        variant="top"
        src="../assets/svg/experts.svg"
        alt="One on Ones"
      />
      <Card.Body>
        <Card.Title className="text-dark">
          Tutoring
        </Card.Title>
        <Card.Link
          href="/1-on-1"
          className="btn btn-sm btn-primary">
          Schedule 1-on-1
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default TutoringWidget;