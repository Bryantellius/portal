import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import MarkdownEditor from '@uiw/react-md-editor';
import { getNamespacedFieldName } from '../../../utils/helpers';
import { FieldArray, useFormikContext } from 'formik';
import ActionButton from '../../shared/components/ActionButton';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import VideoAssociationList from './VideoAssociationList';
import Loading from '../../shared/components/Loading';
import { Input } from 'antd';
import { Field, Form } from 'formik-antd';

const LectureEditor = ({
  fieldNamespace,
  lecture
}) => {
  const {
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormikContext();

  return !!lecture ? (
    <Card>
      <Card.Header className="bg-primary">
        <Card.Title as="h2" className="text-white">
          Lesson Content
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <fieldset className="fieldset">
          <legend>
            General
          </legend>
          <Form.Item
            name={getNamespacedFieldName(fieldNamespace, 'title')}
            label="Title">
            <Input
              name={getNamespacedFieldName(fieldNamespace, 'title')}
              value={lecture.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Title"
            />
          </Form.Item>

          <Form.Item
            name={getNamespacedFieldName(fieldNamespace, 'content')}
            label="Content">
            <Field
              as={MarkdownEditor}
              name={getNamespacedFieldName(fieldNamespace, 'content')}
              value={lecture.content}
              onChange={val => setFieldValue(getNamespacedFieldName(fieldNamespace, 'content'), val)}
              // onBlur={val => setFieldValue(getNamespacedFieldName(fieldNamespace, 'content'), val)}
            />
          </Form.Item>
        </fieldset>
        <fieldset className="fieldset">
          <legend>Videos</legend>
          <FieldArray name={getNamespacedFieldName(fieldNamespace, 'videos')}>
            {({ insert, remove, push }) => (
              <>
                <ActionButton size="sm" className="mb-2" icon={faPlusCircle} onClick={() => {
                  push({ title: '', url: '' });
                }}>
                  Add Video
                </ActionButton>
                <VideoAssociationList
                  videos={lecture.videos}
                  fieldNamespace={getNamespacedFieldName(fieldNamespace, `videos`)}
                />
              </>
            )}
          </FieldArray>
        </fieldset>
      </Card.Body>
    </Card>
    )
    : <Loading/>;
};
export default LectureEditor;