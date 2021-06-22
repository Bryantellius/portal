import React from 'react';
import LectureEditor from './LectureEditor';
import ExerciseEditor from '../../exercise/admin/ExerciseEditor';
import { getNamespacedFieldName } from '../../../utils/helpers';
import QuizEditor from './QuizEditor';
import EditorModal from '../../shared/form/EditorModal';
import ActionButton from '../../shared/components/ActionButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditModuleLecture = ({
  fieldNamespace,
  show,
  lecture,
  moduleIndex,
  lectureIndex,
  onSave,
  onHide,
}) => {
  const exerciseTemplate = {
    title: '',
    content: '',
    videos: []
  };

  const quizTemplate = {
    title: '',
    questions: [],
    lectureId: null
  };

  return (
    <EditorModal
      title={`${ lecture.id ? 'Edit' : 'Add' } Lecture`}
      show={show}
      onHide={onHide}>
      <LectureEditor
        lecture={lecture}
        fieldNamespace={fieldNamespace}
      />
      <ExerciseEditor
        exercise={lecture.exercise || exerciseTemplate}
        fieldNamespace={getNamespacedFieldName(fieldNamespace, 'exercise')}
      />
      <QuizEditor
        quiz={lecture.quiz || quizTemplate}
        fieldNamespace={getNamespacedFieldName(fieldNamespace, 'quiz')}
      />
    </EditorModal>
  );
};

export default EditModuleLecture;