import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import PageHeading from '../../shared/components/PageHeading';
import DataTable from '../../shared/dataTable/DataTable';
import { fetchModule } from '../module.slice';
import { useDispatch, useSelector } from 'react-redux';

const EditModule = () => {
  const { id } = useParams();
  const module = useSelector(state => state.module.module);
  const dispatch = useDispatch();
  const lectures = module?.lectures;
  const [lectureBeingEdited, setLectureBeingEdited] = useState({});
  const [showLectureModal, setShowLectureModal] = useState(false);

  const lectureColumns = useMemo(() => [{
    name: 'Title',
    selector: 'title',
    sortable: false
  }], []);

  const editLecture = lecture => {
    setLectureBeingEdited(lecture);
    openLectureModal();
  };

  const openLectureModal = () => {
    setShowLectureModal(true);
  };

  const closeLectureModal = () => {
    setShowLectureModal(false);
  };

  const setLectureTitle = title => {
    setLectureBeingEdited({
      ...lectureBeingEdited,
      title
    });
  };

  const setLectureContent = content => {
    setLectureBeingEdited({
      ...lectureBeingEdited,
      content
    });
  };

  useEffect(() => {
    dispatch(fetchModule(id));
  }, [id, dispatch]);

  return (
    <div className="page-content">
      <PageHeading>
        View/Edit Module: {`${module?.lastName}, ${module?.firstName}`}
      </PageHeading>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={module?.title} />
        </Form.Group>
        <br />

        <Button
          variant="primary"
          className="float-right"
          onClick={openLectureModal}>
          Add Lecture
        </Button>
        <DataTable
          title="Lectures"
          columns={lectureColumns}
          data={lectures} />
      </Form>

      <Modal
        show={showLectureModal}
        onClick={openLectureModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {lectureBeingEdited ? 'Edit Lesson' : 'Add Lesson'}
          </Modal.Title>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  Title
                </Form.Label>
                <Form.Control
                  type="text"
                  value={lectureBeingEdited.title}
                  onChange={e => setLectureTitle(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Content
                </Form.Label>
                <Form.File onChange={e => setLectureContent(e.target.value)}>
                </Form.File>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default EditModule;
