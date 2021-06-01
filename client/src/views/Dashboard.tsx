import React, { FunctionComponent, useState, useEffect } from "react";
import moment from "moment";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import ApiClient from "../utils/apiClient";
import { Row, Col, Card } from "react-bootstrap";
import { useAppSelector } from '../store/hooks';
import { IAppUser } from '../common/types';

const Dashboard: FunctionComponent = () => {
  const location = useLocation();
  const user = useAppSelector(state => state.auth.user) as IAppUser;
  const apiClient = new ApiClient();

  const [lastLecture, setLastLecture] = useState({
    id: null,
    title: "Lectures"
  });

  useEffect(() => {
    if (user.lastLectureId) {
      fetchLastLectureInfo(user?.lastLectureId);
    }
  }, [user, location.pathname]);

  const fetchLastLectureInfo = async (lastLectureId: string | number) => {
    const lastLecture = await apiClient.get(`/lecture/${ lastLectureId }`);
    if (lastLecture) {
      setLastLecture(lastLecture);
    }
  };

  return (
    <div className="profile-settings mx-auto">
      <div className="mt-3">
        <Row>
          <Col xs={12}>
            <Card className="shadow">
              <Card.Body>
                <Row>
                  <Col md={4} className="text-center">
                    <p className="h4 h-100">Welcome back, {user.firstName}!</p>
                  </Col>
                  <Col md={4} className="text-center">
                    <h1 className="h-100">{user.course}</h1>
                  </Col>
                  <Col md={4} className="text-center">
                    <p className="h-100">{moment().format("MMM DD yyyy")}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Card bg="light" className="shadow h-100">
              <Card.Img
                variant="top"
                src="../assets/svg/learn.svg"
                alt="One on Ones"
              />
              <Card.Header>
                <h4>{lastLecture.title}</h4>
              </Card.Header>
              <Card.Body>
                <NavLink
                  to={
                    lastLecture
                      ? `/learn/${lastLecture.title.toLowerCase().replace(
                          / /g,
                          "-"
                        )}`
                      : "/learn"
                  }
                  className="btn btn-sm btn-outline-primary">
                  RESUME
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card bg="light" className="shadow h-100">
              <Card.Img
                variant="top"
                src="../assets/svg/experts.svg"
                alt="One on Ones"
              />
              <Card.Header>
                <h4>Tutoring</h4>
              </Card.Header>
              <Card.Body>
                <NavLink
                  to={"/1-on-1"}
                  className="btn btn-sm btn-outline-primary">
                  Schedule
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card bg="light" className="shadow h-100">
              <Card.Img
                variant="top"
                src="../assets/svg/career-services.svg"
                alt="One on Ones"              
              />
              <Card.Header>
                <h4>Career Services</h4>
              </Card.Header>
              <div className="card-body">
                <NavLink
                  to={"/career-services"}
                  className="btn btn-sm btn-outline-primary">
                  Calendar
                </NavLink>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
