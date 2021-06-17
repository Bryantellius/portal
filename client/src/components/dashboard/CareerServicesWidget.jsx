import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CareerServicesWidget = () => {
  return (
    <Card text="dark" className="shadow dashboard-widget bg-light-success">
      <Card.Img
        variant="top"
        src="../assets/svg/career-services.svg"
        alt="One on Ones"
      />
      <Card.Header>
        <Card.Title className="text-dark">Career Services</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Link
          href="/career-services"
          className="btn btn-sm btn-primary">
          Schedule Appointment
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CareerServicesWidget;