import React, { useMemo, Fragment } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './CourseProgressBar.scss';

const CourseProgressBar = () => {
  const allLectures = useSelector(state => state.course.activeCourse?.modules?.flatMap(module => module.lectures) || []);
  const completedLectures = useSelector(state => state.lecture.completedLectures);
  const completionPercentage = useMemo(() => {
    return (completedLectures.length / parseFloat(allLectures.length) * 100).toFixed(1);
  }, [allLectures, completedLectures]);

  return (
    <Fragment>
      <h5 className="text-success">
        { completionPercentage }% Complete
      </h5>
      <ProgressBar
        style={ { height: '25px', marginBottom: '20px' } }
        now={ completionPercentage }
        label={ `` }
        variant="success"
        animated={ true }
      />
    </Fragment>
  );
};

export default CourseProgressBar;