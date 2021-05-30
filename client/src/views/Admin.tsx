import React, { FunctionComponent } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Admin: FunctionComponent = () => {
  return (
    <div className="profile-settings mx-auto">
      <Container className="mt-3">
        <Row>
          <Col xs={12}>
            <h1 className="text-center">Admin View</h1>
            <p className="text-muted text-center">What are you looking for?</p>
          </Col>
          <Col md={6}>
            <div className="card shadow bg-light h-100">
              <Image
                src="../assets/svg/admin-view.svg"
                alt="One on Ones"
                className="card-img-top"
              />
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center">
                  <NavLink
                    className="btn btn-lg btn-outline-primary"
                    to="/admin/view">
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <Card bg="light" className="shadow h-100">
              <Card.Img
                variant="top"
                src="../assets/svg/admin-edit.svg"
                alt="One on Ones"
              />
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <NavLink
                    className="btn btn-lg btn-outline-primary"
                    to="/admin/add-edit">
                    Add/Edit
                  </NavLink>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
