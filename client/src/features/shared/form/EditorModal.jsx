import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ActionButton from '../components/ActionButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditorModal = ({
  title,
  show,
  onHide,
  children,
  onSave,
  ...props
}) => {
  return (
    <Modal
      dialogClassName="editor-modal"
      show={show}
      onHide={onHide}
      {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          { title }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <ActionButton
          icon={faSave}
          type="button"
          onClick={onSave}>
          Save
        </ActionButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EditorModal;