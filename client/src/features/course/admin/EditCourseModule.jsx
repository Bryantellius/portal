import React from 'react';
import { Form } from 'react-bootstrap';
import { FastField, FieldArray, useFormikContext } from 'formik';
import ModuleLessonList from './ModuleLectureList';
import EditLesson from './EditLesson';
import { getNamespacedFieldName } from '../../../utils/helpers';
import EditorModal from '../../shared/form/EditorModal';
import moduleService from '../../module/module.service';

const EditCourseModule = ({
  show,
  module,
  moduleIndex,
  onHide,
  fieldNamespace
}) => {
  const {
    setFieldValue,
    handleChange,
    handleBlur
  } = useFormikContext();

  const getLessonTemplate = () => {
    return {
      isEditing: true,
      title: '',
      content: '',
      videos: [],
      exercise: {
        videos: [],
        content: ''
      },
      quiz: {
        videos: [],
        questions: []
      }
    };
  };

  const saveModule = async () => {

    module.lectures = module.lectures.map(lecture => lecture.id);
    const saved = await moduleService.upsert(module);

    setFieldValue(getNamespacedFieldName(fieldNamespace, 'id'), saved.id);
    console.log(saved);

    onHide();
  };

  return (
    <EditorModal
      show={show}
      onHide={onHide}
      title={`${module?.id ? 'Edit' : 'Add'} Module`}
      onSave={saveModule}>
      <Form.Group>
        <Form.Label>
          Title
        </Form.Label>
        <FastField
          as={Form.Control}
          type="text"
          name={getNamespacedFieldName(fieldNamespace, 'title')}
          value={module.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Title" />
      </Form.Group>

      <FieldArray name={getNamespacedFieldName(fieldNamespace, 'lectures')}>
        {({ insert, remove, push }) => (
          <>
            <ModuleLessonList
              moduleIndex={moduleIndex}
              lectures={module.lectures?.filter(lecture => !lecture.isEditing)}
              onCreate={() => {
                push(getLessonTemplate());
              }}
              onRemove={index => remove(index)} />

            {
              module.lectures &&
              module.lectures.length > 0 &&
              module.lectures.map((lecture, index) => (
                <EditLesson
                  key={index}
                  fieldNamespace={getNamespacedFieldName(fieldNamespace, `lectures.${index}`)}
                  lecture={lecture}
                  show={lecture.isEditing}
                  moduleIndex={moduleIndex}
                  lectureIndex={index}
                  onHide={() => {
                    setFieldValue(`modules.${moduleIndex}.lectures.${index}.isEditing`, false);
                  }} />
              ))
            }
          </>
        )}
      </FieldArray>
    </EditorModal>
  );
};

export default EditCourseModule;