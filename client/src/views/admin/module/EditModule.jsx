import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiClient from '../../../utils/apiClient';
import { Button, Card, Col, Form, FormControl, Modal, Row, Table } from 'react-bootstrap';
import PageHeading from '../../../components/shared/PageHeading';
import DataTable from '../../../components/shared/DataTable';

const EditModule = () => {
  const { id } = useParams();
  const [module, setModule] = useState();
  const [lectures, setLectures] = useState([]);
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
    })
  }

  useEffect(() => {
    const fetchModule = async () => {
      const apiService = new ApiClient();
      const module = await apiService.get(`/module/${ id }`);
      setModule(module);
    };

    fetchModule();
  }, [id, setModule]);
  return (
    <div className="page-content">
      <PageHeading>
        View/Edit Module: { `${ module?.lastName }, ${ module?.firstName }` }
      </PageHeading>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={module?.title}
          />
        </Form.Group>
        <br/>

        <Button variant="primary" className="float-right" onClick={openLectureModal}>
          Add Lecture
        </Button>
        <DataTable
          title="Lectures"
          columns={lectureColumns}
          data={lectures}
        />
      </Form>

      <Modal show={showLectureModal} onClick={openLectureModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {lectureBeingEdited ? 'Edit Lecture' : 'Add Lecture'}
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
                  onChange={e => setLectureTitle(e.target.value)}
                />
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
