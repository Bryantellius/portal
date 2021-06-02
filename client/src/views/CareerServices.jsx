import moment from "moment";
import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

const CareerServices = () => {
  return (
    <div className="profile-settings mx-auto">
      <Container className="mt-3">
        <Row className="row">
          <Col xs={12}>
            <h1 className="text-center">Career Services</h1>
          </Col>
          <Col xs={6}>
            <Card bg="light" className="shadow h-100">
              <Card.Img
                variant="top"
                src="assets/svg/career-services.svg"
                alt="One on Ones"
              />
              <Card.Header>
                <h1 className="text-center">Career Services Calendar</h1>
              </Card.Header>
              <Card.Body>
                <Row className="row">
                  <Col xs={12} className="text-center">
                    {moment().day() === 3 || moment().day() === 5 ? (
                      <p>No Career Workshop Today!</p>
                    ) : (
                      <Button
                        variant="primary"
                        className="text-white"
                        as="a"
                        href="https://us02web.zoom.us/j/81193680506?pwd=dmUrREFYQjlGajJnUzVqb3Nkbmlvdz09"
                        target="_blank">
                        Join the Career Workshop
                      </Button>
                    )}
                  </Col>
                </Row>
                <hr />
                <p className="p-2">
                  Need support? Contact{" "}
                  <a
                    className="supportEmail"
                    href="mailto:support@truecoders.io">
                    support@truecoders.io
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card bg="light" className="shadow h-100">
              <Card.Header>
                <h3 className="text-center">Schedule An Appointment</h3>
              </Card.Header>
              <Card.Body>
                <iframe
                  title="Schedule an Appointment"
                  className="w-100 h-100"
                  srcDoc={`
                    <div id="SOIDIV_1on1WJobPlacementProfessional" data-so-page="1on1WJobPlacementProfessional" data-height="550" data-style="border: 1px solid #d8d8d8; min-height: 500px; min-width: 290px; max-width: 900px;" data-psz="00"></div>
                    <script type="text/javascript" src="https://cdn.oncehub.com/mergedjs/so.js"></script>
                  `}
                  frameBorder="0">
                </iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CareerServices;
