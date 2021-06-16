import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiClient from '../../../utils/apiClient';
import { Card, Form } from 'react-bootstrap';
import PageHeading from '../../../components/shared/PageHeading';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import DataTableActions from '../../../components/shared/DataTableActions';
import DataTable from '../../../components/shared/DataTable';

const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [modules, setModules] = useState([]);

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
    const fetchCourse = async () => {
      const apiService = new ApiClient();
      const course = await apiService.get(`/course/${ id }`);
      setCourse(course);
    };

    fetchCourse();
  }, [id, setCourse]);
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
            onChange={e => setCourse({
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
            onChange={e => setCourse({
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
            onChange={e => setCourse({
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
            onChange={e => setCourse({
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
