import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CareerServicesWidget from './CareerServicesWidget';
import EnrolledCoursesWidget from './EnrolledCoursesWidget';
import GreetingWidget from './GreetingWidget';
import TutoringWidget from './TutoringWidget';
import { Button } from 'antd';

const DashboardPage = () => {
  const history = useHistory();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!(user && user.id)) {
      return;
    }

    if (!(user?.firstName && user?.lastName)) {
      history.push('/additional-info');
    }
  }, [user, history]);

  return (
    <Wrapper>

      <Button type="primary">
        Test Button
      </Button>
      <Row className="align-items-top mb-5">
        <Col xs={6}>
          <EnrolledCoursesWidget />
        </Col>
        <Col xs={6}>
          <GreetingWidget />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6}>
          <TutoringWidget />
        </Col>
        <Col xs={12} md={6}>
          <CareerServicesWidget />
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
`

export default DashboardPage;
