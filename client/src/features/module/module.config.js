import React from 'react';
import moment from 'moment';

export const columnDefinitions = [{
  title: 'Title',
  dataIndex: 'title'
}, {
  title: 'Date Added',
  dataIndex: 'createdAt',
  render: (_, row, index) => moment(row.createdAt).fromNow()
}];