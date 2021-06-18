import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExerciseSubmissions, approveSubmission } from '../exercise.slice';
import DataTable from '../../shared/components/DataTable';
import PageHeading from '../../shared/components/PageHeading';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ViewExerciseSubmissionsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submissions = useSelector(state => state.exercise.submissions);
  const [selectedRows, setSelectedRows] = useState([]);

  const columnDefinitions = useMemo(() => [{
    name: 'Student',
    selector: 'user',
    format: row => `${ row.user.firstName } ${ row.user.lastName }`,
    sortable: true,
    grow: 1
  },
  {
    name: 'Lecture',
    selector: 'lecture',
    format: row => row?.exercise?.lecture?.title,
    sortable: true
  },
  {
    name: 'Repo Link',
    selector: 'repoUrl',
    format:  row => {
      return (
        <a href={row.repoUrl} target="_blank" className="link">
          {row.repoUrl}
        </a>
      );
    }
  },
  {
    name: 'Submitted',
    selector: 'createdAt',
    format: row => moment(row.createdAt).fromNow()
  },
  {
    name: 'Reviewed',
    selector: 'hasBeenReviewed',
    grow: 0,
    format: row => {
      return row.hasBeenReviewed
        ? <FontAwesomeIcon size="lg" icon={faCheckCircle} className="text-success" />
        : <FontAwesomeIcon size="lg" icon={faTimesCircle} className="text-danger" />
    }
  },
  {
    name: 'Review',
    selector: 'id',
    format: row => (<Button variant="primary" size="sm" onClick={e => goToCommentThread(row.id)}>Add Comment</Button>),
    grow: 1
  }
], []);

  const goToCommentThread = submissionId => {
    history.push(`/exercise/review/${ submissionId }`);
  };

  const contextActions = useMemo(() => {
    const approveSubmissions = async () => {
      await Promise.all(selectedRows.map(row => {
        dispatch(approveSubmission(row.id));
      }))
    };

    return (
      <Button type="button" size="sm" variant="primary" onClick={e => approveSubmissions()}>Approve</Button>
    );
  }, [selectedRows]);

  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  useEffect(() => {
    dispatch(fetchExerciseSubmissions());
  }, [dispatch]);

  return (
    <div className="page-content">
      <PageHeading title="Exercise Submissions" />
      {
        <DataTable
          title="Review Exercise Submissions"
          columns={columnDefinitions}
          data={submissions}
          loading={!(submissions && submissions?.length)}
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleSelectedRowsChange}
        />
      }
    </div>
  );
};

export default ViewExerciseSubmissionsPage;
