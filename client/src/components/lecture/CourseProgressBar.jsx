import React, { useMemo } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CourseProgressBar = () => {
  const allLectures = useSelector(state => state.lecture.lectures);
  const completedLectures = useSelector(state => state.lecture.completedLectures);
  const completionPercentage = useMemo(() => {
    return completedLectures.length / parseFloat(allLectures.length) * 100;
  }, [allLectures, completedLectures]);

  return (
    <>
      <span>
        Course Progress
      </span>
      <ProgressBar now={completionPercentage} label={`${ completionPercentage }%`} variant="success" animated={true}  />
    </>
  );
};

export default CourseProgressBar;
