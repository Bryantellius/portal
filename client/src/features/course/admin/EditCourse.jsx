import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import PageHeading from '../../shared/components/PageHeading';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import DataTableActions from '../../shared/components/DataTableActions';
import DataTable from '../../shared/components/DataTable';
import { fetchCourse } from '../course.slice';
import { useDispatch, useSelector } from 'react-redux';

const EditCourse = () => {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const dispatch = useDispatch();
  const course = useSelector(state => state.course.course);
  const [editorCourse, setEditorCourse] = useState(course);

  const addModule = () => {
    setModules([...modules, {}]);
  };

  const removeModule = () => {
    setModules([modules.slice(1)]);
  };

  const moduleColumns = useMemo(() => {
    return [{
      name: 'Title',
      selector: 'title',
      sortable: true
    }, {
      name: 'Date Added',
      selector: 'createdAt',
      sortable: true
    }, {
      sortable: false,
      button: true,
      cell: row => (
        <Button variant="danger" size="sm" onClick={e => removeModule(row.id)}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </Button>
      )
    }];
  }, [removeModule]);

  useEffect(() => {
    dispatch(fetchCourse(id))
  }, [id, dispatch]);

  return (
    <div className="page-content">
      <PageHeading>
        View/Edit Course: { `${ course?.lastName },${ course?.firstName }` }
      </PageHeading>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={course?.title}
            onChange={e => setEditorCourse({
              ...course,
              title: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            value={course?.type}
            onChange={e => setEditorCourse({
              ...course,
              type: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={moment(course?.startDate).format('YYYY-MM-DD')}
            onChange={e => setEditorCourse({
              ...course,
              startDate: e.target.value
            })}
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={moment(course?.endDate).format('YYYY-MM-DD')}
            onChange={e => setEditorCourse({
              ...course,
              endDate: e.target.value
            })}
          />
        </Form.Group>
        <Card>
          <Card.Body>
            <DataTableActions>
              <Button
                className="float-right"
                variant="primary"
                size="sm"
                onClick={addModule}>
                <FontAwesomeIcon icon={faPlus} />
                Add
              </Button>
            </DataTableActions>
            <DataTable
              title="Included Modules"
              columns={moduleColumns}
              data={modules}
              selectableRows>
            </DataTable>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default EditCourse;
