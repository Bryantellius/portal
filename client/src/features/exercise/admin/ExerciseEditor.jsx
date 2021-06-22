import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { getNamespacedFieldName } from '../../../utils/helpers';
import MarkdownEditor from '@uiw/react-md-editor';
import { FastField, FieldArray, useFormikContext } from 'formik';
import ActionButton from '../../shared/components/ActionButton';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import VideoAssociationList from '../../course/admin/VideoAssociationList';
import Loading from '../../shared/components/Loading';

const ExerciseEditor = ({
  fieldNamespace,
  exercise
}) => {
  const { handleChange, handleBlur } = useFormikContext();

  return !!exercise ? (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2>Exercise</h2>
        </Card.Title>
        <fieldset className="fieldset">
          <Form.Group>
            <Form.Label>
              Content
            </Form.Label>
            <FastField
              name={getNamespacedFieldName(fieldNamespace, 'content')}
              as={MarkdownEditor}
              value={exercise.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
        </fieldset>

        <fieldset className="fieldset">
          <legend>
            Videos
          </legend>
          <FieldArray name={getNamespacedFieldName(fieldNamespace, 'videos')}>
            {({ insert, remove, push }) => (
              <>
                <ActionButton size="sm" className="mb-2" icon={faPlusCircle} onClick={() => {
                  push({ title: '', url: '' });
                }}>
                  Add Video
                </ActionButton>
                <VideoAssociationList
                  videos={exercise.videos}
                  fieldNamespace={getNamespacedFieldName(fieldNamespace, 'videos')}
                />
              </>
            )}
          </FieldArray>
        </fieldset>
      </Card.Body>
    </Card>
  ) : <Loading />;
};

export default ExerciseEditor;