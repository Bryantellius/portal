import React, { useEffect } from 'react';
import styled from 'styled-components';
import CareerServicesWidget from './CareerServicesWidget';
import EnrolledCoursesWidget from './EnrolledCoursesWidget';
import GreetingWidget from './GreetingWidget';
import TutoringWidget from './TutoringWidget';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrolledCourses } from '../course/course.slice';

const DashboardPage = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCoursesForUser = async () => {
      dispatch(fetchEnrolledCourses(user?.id));
    };
    if (user?.id) {
      loadCoursesForUser();
    }

  }, [dispatch, user]);

  return (
    <Wrapper>
      <Row
        align="center"
        gutter={ [{ xs: 8, sm: 16, md: 24, lg: 32 }, 16] }
        style={ { marginBottom: '16px' } }>
        <Col xs={ 24 }>
          <GreetingWidget />
        </Col>
        <Col
          xs={ 24 }
          md={ 12 }
          lg={ 8 }>
          <TutoringWidget />
        </Col>
        <Col
          xs={ 24 }
          md={ 12 }
          lg={ 8 }>
          <CareerServicesWidget />
        </Col>
        <Col
          xs={ 24 }
          sm={ 16 }
          lg={ 16 }>
          <EnrolledCoursesWidget />
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
`;

export default DashboardPage;
