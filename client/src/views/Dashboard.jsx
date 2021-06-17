import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApiClient from '../utils/apiClient';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EnrolledCoursesWidget from '../components/dashboard/EnrolledCoursesWidget';
import { setEnrolledCourses } from '../store/course/courseSlice';
import TutoringWidget from '../components/dashboard/TutoringWidget';
import CareerServicesWidget from '../components/dashboard/CareerServicesWidget';
import './Dashboard.scss';
import GreetingWidget from '../components/dashboard/GreetingWidget';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!(user?.firstName && user?.lastName)) {
      history.push('/additional-info');
    }
  }, [user, history]);

  useEffect(() => {
    const getEnrolledCourses = async () => {
      console.log('Loading enrolled courses');
      const apiClient = new ApiClient();

      const enrolledCourses = await apiClient.get(`/user/${ user.id }/course`);

      dispatch(setEnrolledCourses(enrolledCourses));
    };

    getEnrolledCourses();
  }, [user, dispatch]);

  return (
    <div className="profile-settings mx-auto">
      <div className="mt-3">
        <Row>
          <Col xs={12} md={4}>
            <GreetingWidget />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <EnrolledCoursesWidget />
          </Col>
          <Col xs={12} md={6}>
            <Row xs={1}>
              <Col>
                <TutoringWidget />
              </Col>
              <Col>
                <CareerServicesWidget />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
