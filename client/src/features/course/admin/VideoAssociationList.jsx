import React from 'react';
import { Col, List, Row, Typography } from 'antd';
import { getNamespacedFieldName } from '../../../utils/helpers';
import { useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import ActionButton from '../../shared/components/ActionButton';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const VideoAssociationList = ({
  videos,
  fieldNamespace,
  onRemove
}) => {
  const { handleChange, handleBlur } = useFormikContext();
  return (
    <>
      <List
        header={
          <Typography.Title level={4}>
            Videos
          </Typography.Title>
        }>
        {
          videos && videos.map((video, index) => (
            <List.Item key={index}>
              <Row
                justify="space-between"
                align="middle">
                <Col flex="auto">
                  <Form.Item
                    style={{
                      alignItems: 'center'
                    }}
                    label="Title"
                    name={getNamespacedFieldName(fieldNamespace, `${index}.title`)}>
                    <Input
                      type="text"
                      name={getNamespacedFieldName(fieldNamespace, `${index}.title`)}
                      value={video.title}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                  </Form.Item>
                </Col>

                <Col flex="auto">
                  <Form.Item
                    style={{
                      alignItems: 'center',
                      verticalAlign: 'middle',
                      height: '100%'
                    }}
                    label="URL"
                    name={getNamespacedFieldName(fieldNamespace, `${index}.url`)}>
                    <Input
                      type="text"
                      name={getNamespacedFieldName(fieldNamespace, `${index}.url`)}
                      value={video.url}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                  </Form.Item>
                </Col>

                <Col flex="auto">
                  <ActionButton
                    className="float-right"
                    onClick={onRemove}
                    icon={faTrashAlt}>
                    Remove
                  </ActionButton>
                </Col>
              </Row>

            </List.Item>
          ))
        }
      </List>
    </>
  );
};

export default VideoAssociationList;