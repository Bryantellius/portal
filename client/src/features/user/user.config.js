const columnDefinitions = {
  users: [{
    name: 'ID',
    selector: 'id',
    sortable: true,
    grow: 0
  }, {
    name: 'First Name',
    selector: 'firstName',
    sortable: true
  }, {
    name: 'Last Name',
    selector: 'lastName',
    sortable: true
  }, {
    name: 'Email',
    selector: 'email',
    sortable: true
  }, {
    name: 'Role',
    selector: 'role',
    sortable: true,
    format: row => {
      console.log('ROW: ', row);
      return row.role?.title || 'None';
    }
  }],

  userEnrolledCourses: [{
    title: 'Course',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'Date Enrolled',
    dataIndex: 'createdAt',
    sortable: true
  },{
    title: 'Quiz Score',
    dataIndex: 'aggregateScore',
    key: 'aggregateScore'
  }],

  userCompletedCourses: [{
    title: 'Course',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'Date Completed',
    dataIndex: 'dateCompleted',
    key: 'dateCompleted'
  }, {
    title: 'Quiz Score',
    dataIndex: 'aggregateScore',
    key: 'aggregateScore'
  }],

  userQuizSubmissions: [{
    title: 'Course',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'Date Enrolled',
    dataIndex: 'createdAt',
    key: 'createdAt'
  }]
};

export {
  columnDefinitions
};