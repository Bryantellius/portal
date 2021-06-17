import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const VideoSearchControl = ({ value, onChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Title
        </Form.Label>
        <Form.Control
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Search by title"
        />
      </Form.Group>
    </Form>
  );
};

export default VideoSearchControl;