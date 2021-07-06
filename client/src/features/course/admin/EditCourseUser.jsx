import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Select } from 'formik-antd';
import EditorModal from '../../shared/form/EditorModal';
import { getNamespacedFieldName } from '../../../utils/helpers';
import { FieldArray, useFormikContext } from 'formik';
import moment from 'moment';
import lectureService from '../../lecture/lecture.service';
import CourseUserExerciseSubmissionList from './CourseUserExerciseSubmissionList';
import CourseUserQuizSubmissionList from './CourseUserQuizSubmissionList';

const EditCourseUser = ({
  fieldNamespace,
  show,
  onHide,
  onSave,
  courseUser
}) => {

  const [lectureOptions, setLectureOptions] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const lectures = await lectureService.fetchAll();

      setLectureOptions(lectures?.map(lecture => {
        return {
          label: lecture?.title,
          value: lecture?.id
        };
      }));
    };

    fetchLectures();
  }, []);

  const {
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormikContext();

  return (
    <EditorModal
      show={show}
      onHide={onHide}
      onSave={onSave}
      title={`Edit Enrollee: ${courseUser?.user?.firstName} ${courseUser?.user?.lastName}`}>

      <Form.Item
        label="Date Enrolled"
        name={getNamespacedFieldName(fieldNamespace, 'createdAt')}>
        <DatePicker
          name={getNamespacedFieldName(fieldNamespace, 'createdAt')}
          value={moment(courseUser?.createdAt)}
          onChange={handleChange}
          onBlur={handleBlur} />
      </Form.Item>

      <Form.Item
        name={getNamespacedFieldName(fieldNamespace, 'user.lastLectureId')}
        label="Last Completed Lesson">
        <Select
          name={getNamespacedFieldName(fieldNamespace, 'user.lastLectureId')}
          value={courseUser?.user?.lastLectureId}
          options={lectureOptions}
          onChange={val => setFieldValue(getNamespacedFieldName(fieldNamespace, 'user.lastLectureId'), val)} />
      </Form.Item>

      <FieldArray name={getNamespacedFieldName(fieldNamespace, 'user.exerciseSubmissions')}>
        {({ insert, remove, push }) => (
          <CourseUserExerciseSubmissionList userId={courseUser.userId} />
        )}
      </FieldArray>

      <FieldArray name={getNamespacedFieldName(fieldNamespace, 'user.quizSubmissions')}>
        {({ insert, remove, push }) => (
          <CourseUserQuizSubmissionList userId={courseUser.userId} />
        )}
      </FieldArray>
    </EditorModal>
  );
};

export default EditCourseUser;