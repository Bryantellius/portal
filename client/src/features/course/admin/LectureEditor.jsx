import React from 'react';
import MarkdownEditor from '@uiw/react-md-editor';
import { getNamespacedFieldName } from '../../../utils/helpers';
import { FieldArray, useFormikContext } from 'formik';
import VideoAssociationList from './VideoAssociationList';
import { Button, Card, Input } from 'antd';
import { Field, Form } from 'formik-antd';
import { PlusOutlined } from '@ant-design/icons';

const LectureEditor = ({
  fieldNamespace,
  lecture
}) => {
  const {
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormikContext();

  return (
    <>
      {
        lecture && (
          <Card title="Lecture">
            <Form.Item
              name={getNamespacedFieldName(fieldNamespace, 'title')}
              label="Title">
              <Input
                name={getNamespacedFieldName(fieldNamespace, 'title')}
                value={lecture.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Title" />
            </Form.Item>

            <Form.Item
              name={getNamespacedFieldName(fieldNamespace, 'content')}
              label="Content">
              <Field
                as={MarkdownEditor}
                name={getNamespacedFieldName(fieldNamespace, 'content')}
                value={lecture.content}
                onChange={val => setFieldValue(getNamespacedFieldName(fieldNamespace, 'content'), val)} />
            </Form.Item>

            <FieldArray name={getNamespacedFieldName(fieldNamespace, 'videos')}>
              {({ insert, remove, push }) => (
                <>
                  <Button
                    type="primary"
                    className="mb-2"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      push({ title: '', url: '' });
                    }}
                    style={{
                      float: 'right'
                    }}>
                    Add Video
                  </Button>
                  <VideoAssociationList
                    videos={lecture.videos}
                    fieldNamespace={getNamespacedFieldName(fieldNamespace, `videos`)} />
                </>
              )}
            </FieldArray>
          </Card>
        )
      }
    </>
  );
};

export default LectureEditor;