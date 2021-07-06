import moment from 'moment';

export const columnDefinitions = {
  courseDefinition: [{
    title: 'Title',
    dataIndex: 'title',
    sortable: true,
    grow: 2
  }, {
    title: 'Type',
    dataIndex: 'type',
    sortable: true
  }],
  courseIteration: [{
    title: 'Start Date',
    dataIndex: 'startDate',
    render: (text, row) => moment(row.startDate).format('MM/DD/YYYY')
  }, {
    title: 'End Date',
    dataIndex: 'endDate',
    render: (text, row) => moment(row.startDate).format('MM/DD/YYYY')
  }, {
    title: 'Users',
    key: 'users',
    render: (text, row) => row.courseUsers?.length
  }]
};