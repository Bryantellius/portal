import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Typography } from 'antd';

const exerciseConfig = {
  exerciseSubmissions: {
    columnDefinitions: [{
      title: 'Student',
      dataIndex: 'user',
      render: (_, row) => `${row.user?.firstName} ${row.user?.lastName}`
    },
      {
        title: 'Lecture',
        dataIndex: 'lecture',
        render: (_, row) => row?.exercise?.lecture?.title,
        sortable: true
      },
      {
        title: 'Repo Link',
        dataIndex: 'repoUrl',
        render: (_, row) => {
          return (
            <Typography.Link
              href={row.repoUrl}
              target="_blank"
              rel="noreferrer">
              {row.repoUrl}
            </Typography.Link>
          );
        }
      },
      {
        title: 'Submitted',
        dataIndex: 'createdAt',
        render: (_, row) => moment(row.createdAt).fromNow()
      },
      {
        title: 'Reviewed',
        dataIndex: 'hasBeenReviewed',
        render: (_, row) => {
          return row.hasBeenReviewed
            ? <FontAwesomeIcon
              size="lg"
              icon={faCheckCircle}
              className="text-success" />
            : <FontAwesomeIcon
              size="lg"
              icon={faTimesCircle}
              className="text-danger" />;
        }
      }]
  }
};

export default exerciseConfig;