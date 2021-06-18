import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const VideoSearchControl = ({ value, onChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Search Videos
        </Form.Label>
        <Form.Control
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Start typing a title"
        />
      </Form.Group>
    </Form>
  );
};

export default VideoSearchControl;