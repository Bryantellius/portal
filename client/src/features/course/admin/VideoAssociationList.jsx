import React from 'react';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getNamespacedFieldName } from '../../../utils/helpers';
import { FastField, useFormikContext } from 'formik';
import ActionButton from '../../shared/components/ActionButton';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import LineBreak from '../../shared/components/LineBreak';

const VideoAssociationList = ({
  videos,
  fieldNamespace,
  onRemove
}) => {
  const { handleChange, handleBlur } = useFormikContext();
  return (
    <ListGroup>
    {
      videos && videos.map((video, index) => (
        <ListGroupItem key={index}>
          <Form.Group>
            <Form.Label>
              Title
            </Form.Label>
            <FastField
              as={Form.Control}
              type="text"
              name={getNamespacedFieldName(fieldNamespace, `${ index }.title`)}
              value={video.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              URL
            </Form.Label>
            <FastField
              as={Form.Control}
              type="text"
              name={getNamespacedFieldName(fieldNamespace, `${ index }.url`)}
              value={video.url}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <ActionButton class="float-right" onClick={onRemove} icon={faTrashAlt}>
            Remove
          </ActionButton>
        </ListGroupItem>
      ))
    }
    </ListGroup>
  );
};

export default VideoAssociationList;