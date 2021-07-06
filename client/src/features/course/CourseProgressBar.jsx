import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './CourseProgressBar.scss';
import { Card, Col, Progress, Row, Typography } from 'antd';
import { green, grey } from '@ant-design/colors';

const CourseProgressBar = () => {
  const allLectures = useSelector(state => state.course.activeCourse?.modules?.flatMap(module => module.lectures) || []);
  const completedLectures = useSelector(state => state.lecture.completedLectures);
  const completionPercentage = useMemo(() => {
    return allLectures?.length > 0
      ? (completedLectures.length / parseFloat(allLectures.length) * 100).toFixed(1)
      : (0).toFixed(2);
  }, [allLectures, completedLectures]);

  return (
    <Card type="secondary">
      <Row align="middle">
        <Col xs={12}>
          <Typography.Title level={4}>
            Course Progress
          </Typography.Title>
        </Col>
        <Col xs={12}>
          <Progress
            type="circle"
            percent={completionPercentage}
            width={80}
            trailColor={grey[0]}
            strokeColor={green.primary} />
        </Col>
      </Row>
    </Card>
  );
};

export default CourseProgressBar;