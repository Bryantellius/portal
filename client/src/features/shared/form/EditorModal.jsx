import React from 'react';
import { Modal } from 'antd';
import ActionButton from '../components/ActionButton';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './editorModal.scss';

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
      visible={show}
      title={title}
      onCancel={onHide}
      footer={
        <ActionButton
          icon={faSave}
          type="button"
          onClick={onSave}>
          Save
        </ActionButton>
      }
      {...props}>
      {children}
    </Modal>
  );
};

export default EditorModal;