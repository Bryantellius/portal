import React, { useMemo } from 'react';
import { Badge, ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ModuleProgressBar = ({ module }) => {
  const allLectures = useSelector(state => state.lecture.lectures.filter(lecture => lecture.moduleId === module.id));
  const completedLectures = useSelector(state => state.lecture.completedLectures);
  const completionPercentage = useMemo(() => {
    return completedLectures.length / allLectures.length.toFixed(2) * 100;
  }, [allLectures, completedLectures]);
  return (
    <>
      <span>
        Complete:
        <Badge variant="secondary" pill>
          { completionPercentage }
        </Badge>
      </span>
      <ProgressBar now={completionPercentage} label={`${ completionPercentage }%`} variant="success" animated={true}  />
    </>
  );
};

export default ModuleProgressBar;