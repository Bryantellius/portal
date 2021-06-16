import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Tutoring = ({ course }) => {
  return (
    <div className="profile-settings mx-auto">
      <Container className="mt-3">
        <Row>
          <Col xs={12}>
            <h1 className="text-center">Schedule a Tutoring Appointment</h1>
          </Col>
          <Col md="6">
            <Card bg-light className="shadow h-100">
              <Card.Img
                variant="top"
                src="../assets/svg/experts.svg"
                alt="One on Ones"
              />
              <Card.Header>
                <h1 className="text-center">
                  {course ? course + " Tutoring" : "Loading..."}
                </h1>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="p-2">
                    Need support? Contact{" "}
                    <a
                      className="supportEmail"
                      href="mailto:support@truecoders.io">
                      support@truecoders.io
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <Card bg="light" className="shadow h-100">
              <Card.Body>
                <iframe
                  title="Schedule Tutoring"
                  className="iframeOnceHub w-100 h-100"
                  srcDoc={`
                    <!-- ScheduleOnce embed START -->
                          <div id="SOIDIV_schedule-1-on-1-${
                            course?.includes("Node") ? "FSWD" : "FSSE"
                          }" data-so-page="schedule-1-on-1-${
                            course?.includes("Node") ? "FSWD" : "FSSE"
                          }" data-height="550" data-style="border: 1px solid #d8d8d8; min-width: 290px; max-width: 900px;" data-psz="00"></div>
                        <script type="text/javascript" src="https://cdn.oncehub.com/mergedjs/so.js"></script>
                        <!-- ScheduleOnce embed END -->
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

export default Tutoring;
