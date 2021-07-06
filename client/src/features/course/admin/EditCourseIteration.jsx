import React from 'react';
import EditorModal from '../../shared/form/EditorModal';
import { DatePicker, Form } from 'formik-antd';
import { FieldArray, useFormikContext } from 'formik';
import { getNamespacedFieldName } from '../../../utils/helpers';
import courseService from '../course.service';
import moment from 'moment';
import { Typography } from 'antd';
import CourseUserList from './CourseUserList';
import EditCourseUser from './EditCourseUser';

const EditCourseIteration = ({
  fieldNamespace,
  courseIndex,
  show,
  onHide,
  onSave,
  course
}) => {

  const {
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormikContext();

  const saveCourseIteration = async () => {
    const result = await courseService.saveCourseIteration(course);
    onSave();
  };

  return (
    <EditorModal
      show={show}
      onHide={onHide}
      title={`${module?.id ? 'Edit' : 'Add'} Course Instance`}
      onSave={saveCourseIteration}>
      <Form.Item
        name={getNamespacedFieldName(fieldNamespace, 'startDate')}
        label="Start Date">
        <DatePicker
          value={moment(course?.startDate)}
          name={getNamespacedFieldName(fieldNamespace, 'startDate')}
          onChange={handleChange}
          onBlur={handleBlur} />
      </Form.Item>

      <Form.Item
        name={getNamespacedFieldName(fieldNamespace, 'startDate')}
        label="End Date">
        <DatePicker
          value={moment(course?.endDate)}
          name={getNamespacedFieldName(fieldNamespace, 'endDate')}
          onChange={handleChange}
          onBlur={handleBlur} />
      </Form.Item>

      <FieldArray name="courseUsers">
        {({ insert, remove, push }) => (
          <>
            <Typography.Title level={3}>
              Enrolled Users
            </Typography.Title>
            <CourseUserList
              users={course?.courseUsers}
              onCreate={() => push({
                userId: '',
                courseId: course.id,
                dateCompleted: null
              })}
              onEdit={index => setFieldValue(`courses.${courseIndex}.courseUsers.${index}.isEditing`, true)} />

            {
              course.courseUsers?.length > 0 && course.courseUsers?.map((courseUser, courseUserIndex) => (
                <EditCourseUser
                  key={courseUserIndex}
                  show={courseUser?.isEditing}
                  courseUser={courseUser}
                  courseUserIndex={courseUserIndex}
                  onSave={() => setFieldValue(`courses.${courseIndex}.courseUsers.${courseUserIndex}.isEditing`, false)}
                  onHide={() => setFieldValue(`courses.${courseIndex}.courseUsers.${courseUserIndex}.isEditing`, false)}
                  fieldNamespace={getNamespacedFieldName(fieldNamespace, `courseUsers.${courseUserIndex}`)} />
              ))
            }
          </>
        )}
      </FieldArray>
    </EditorModal>
  );
};

export default EditCourseIteration;