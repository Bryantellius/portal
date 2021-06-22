import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const exerciseConfig = {
  exerciseSubmissions: {
    columnDefinitions: [{
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
      }
    ]
  }
};

export default exerciseConfig;