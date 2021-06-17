import React, { useMemo, Fragment } from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './CourseProgressBar.scss';

const CourseProgressBar = () => {
  const allLectures = useSelector(state => state.lecture.lectures);
  const completedLectures = useSelector(state => state.lecture.completedLectures);
  const completionPercentage = useMemo(() => {
    return completedLectures.length / parseFloat(allLectures.length) * 100;
  }, [allLectures, completedLectures]);

  return (
    <Card bg="info" text="white" className="course-progress-bar">
            {/*<span className="text-info shadow-md course-completion-percentage-text">*/}

      {/*</span>*/}
      <Card.Body>
        <Card.Text className="text-white mb-0">
          <strong>{ completionPercentage }%</strong> Complete
        </Card.Text>
        <ProgressBar style={{ height: '15px' }} now={completionPercentage} label={`${ completionPercentage }%`} variant="success" animated={true}  />
      </Card.Body>
    </Card>
  );
};

export default CourseProgressBar;
