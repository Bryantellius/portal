import React from 'react';
import { Steps } from 'antd';
import { useSelector } from 'react-redux';
const { Step } = Steps;

const LectureStepsNav = ({ currentStep, onChange }) => {
  const lecture = useSelector(state => state.lecture.currentLecture);
  const quizSubmission = useSelector(state =>
    state.quiz?.userSubmissions
    ?.filter(submission => submission.exerciseId === lecture?.exercise?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
  );
  const exerciseSubmission = useSelector(state =>
    state.exercise?.userSubmissions
    ?.filter(submission => submission.exerciseId === lecture?.exercise?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
  );

  const getLessonStatus = () => {
    return currentStep === 0
      ? "process"
      : "finish";
  };

  const getExerciseStatus = () => {
    if (exerciseSubmission) {
      return "finish";
    }

    return currentStep === 1
      ? "process"
      : "wait";
  };

  const getQuizStatus = () => {
    if (quizSubmission) {
      return "finish";
    }

    return currentStep === 2
      ? "process"
      : "wait";
  };


  return (
    <Steps
      type="navigation"
      size="default"
      current={currentStep}
      onChange={onChange}>
      <Step status={getLessonStatus()} title="Lesson" />
      <Step status={getExerciseStatus()} title="Exercise" />
      <Step status={getQuizStatus()} title="Quiz" />
    </Steps>
    // <LectureNav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
    //   <LectureStep>
    //     <Nav.Link eventKey="lesson">
    //       Lesson
    //     </Nav.Link>
    //   </LectureStep>
    //   <LectureStep>
    //     <Nav.Link eventKey="exercise">
    //       Exercise
    //     </Nav.Link>
    //   </LectureStep>
    //   <LectureStep>
    //     <Nav.Link eventKey="quiz">
    //       Quiz
    //     </Nav.Link>
    //   </LectureStep>
    // </LectureNav>
  );
};

/*const LectureNav = styled(Nav)`
  justify-content: space-around;
`;

const LectureStep = styled(Nav.Item)`
  flex-grow: 1;
  text-align: center;
`;*/

export default LectureStepsNav;
