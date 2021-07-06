import moment from 'moment/moment';

const columnDefinitions = {
  users: [{
    title: 'ID',
    dataIndex: 'id',
    grow: 0
  }, {
    title: 'First Name',
    dataIndex: 'firstName'
  }, {
    title: 'Last Name',
    dataIndex: 'lastName'
  }, {
    title: 'Email',
    dataIndex: 'email'
  }, {
    title: 'Role',
    dataIndex: 'role',
    render: (_, row) => {
      return row.role?.title || 'None';
    }
  }],

  userEnrolledCourses: [{
    title: 'Course',
    dataIndex: 'title'
  }, {
    title: 'Date Enrolled',
    dataIndex: 'createdAt'
  }, {
    title: 'Quiz Score',
    dataIndex: 'aggregateScore'
  }],

  userCompletedCourses: [{
    title: 'Course',
    dataIndex: 'title'
  }, {
    title: 'Date Completed',
    dataIndex: 'dateCompleted'
  }, {
    title: 'Quiz Score',
    dataIndex: 'aggregateScore'
  }],

  userQuizSubmissions: [{
    title: 'Lecture',
    dataIndex: ['quiz', 'lecture', 'title']
  }, {
    title: 'Score',
    dataIndex: 'score',
    render: (_, row, index) => (row.score * 100).toFixed(0) + '%'
  }, {
    title: 'Date Submitted',
    dataIndex: 'createdAt',
    render: (_, row) => moment(row.createdAt).fromNow()
  }],

  courseUsers: [{
    title: 'ID',
    dataIndex: ['user', 'id']
  }, {
    title: 'First Name',
    dataIndex: ['user', 'firstName']
  }, {
    title: 'Last Name',
    dataIndex: ['user', 'lastName']
  }, {
    title: 'Email',
    dataIndex: ['user', 'email']
  }]
};

export {
  columnDefinitions
};