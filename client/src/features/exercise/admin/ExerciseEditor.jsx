import React from 'react';
import { Card } from 'react-bootstrap';
import { getNamespacedFieldName } from '../../../utils/helpers';
import MarkdownEditor from '@uiw/react-md-editor';
import { FieldArray, useFormikContext } from 'formik';
import ActionButton from '../../shared/components/ActionButton';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import VideoAssociationList from '../../course/admin/VideoAssociationList';
import { Field, Form } from 'formik-antd';

const ExerciseEditor = ({
  fieldNamespace,
  exercise
}) => {
  const {
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormikContext();

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2>Exercise</h2>
        </Card.Title>
        <fieldset className="fieldset">
          <Form.Item
            name={getNamespacedFieldName(fieldNamespace, 'content')}
            label="Content">
            <Field
              name={getNamespacedFieldName(fieldNamespace, 'content')}
              as={MarkdownEditor}
              value={exercise.content}
              onChange={val => setFieldValue(getNamespacedFieldName(fieldNamespace, 'content'), val)} />
          </Form.Item>
        </fieldset>

        <fieldset className="fieldset">
          <legend>
            Videos
          </legend>
          <FieldArray name={getNamespacedFieldName(fieldNamespace, 'videos')}>
            {({ insert, remove, push }) => (
              <>
                <ActionButton
                  size="sm"
                  className="mb-2"
                  icon={faPlusCircle}
                  onClick={() => {
                    push({ title: '', url: '' });
                  }}>
                  Add Video
                </ActionButton>
                <VideoAssociationList
                  videos={exercise.videos}
                  fieldNamespace={getNamespacedFieldName(fieldNamespace, 'videos')} />
              </>
            )}
          </FieldArray>
        </fieldset>
      </Card.Body>
    </Card>
  );
};

export default ExerciseEditor;