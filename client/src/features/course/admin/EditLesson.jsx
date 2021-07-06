import React from 'react';
import LectureEditor from './LectureEditor';
import ExerciseEditor from '../../exercise/admin/ExerciseEditor';
import { getNamespacedFieldName } from '../../../utils/helpers';
import QuizEditor from './QuizEditor';
import EditorModal from '../../shared/form/EditorModal';
import lectureService from '../../lecture/lecture.service';
import { useFormikContext } from 'formik';

const EditLesson = ({
  fieldNamespace,
  show,
  lecture,
  moduleIndex,
  lectureIndex,
  onHide
}) => {
  const {
    values,
    setFieldValue
  } = useFormikContext();

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

  const saveLecture = async () => {
    const lectureToSave = values.modules[moduleIndex].lectures[lectureIndex];

    const saved = await lectureService.upsert(lectureToSave);
    console.log(saved);

    setFieldValue(getNamespacedFieldName(fieldNamespace, 'id'), saved.id);
    onHide();
  };

  return (
    <EditorModal
      title={`${lecture.id ? 'Edit' : 'Add'} Lesson`}
      show={show}
      onSave={saveLecture}
      onHide={onHide}>

      <LectureEditor
        lecture={lecture}
        fieldNamespace={fieldNamespace} />
      <ExerciseEditor
        exercise={lecture.exercise || exerciseTemplate}
        fieldNamespace={getNamespacedFieldName(fieldNamespace, 'exercise')} />
      <QuizEditor
        quiz={lecture.quiz || quizTemplate}
        fieldNamespace={getNamespacedFieldName(fieldNamespace, 'quiz')} />
    </EditorModal>
  );
};

export default EditLesson;