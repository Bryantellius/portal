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
    name: 'Course',
    selector: 'title',
    sortable: true
  }, {
    name: 'Date Enrolled',
    selector: 'createdAt',
    sortable: true
  }],

  userCompletedCourses: [{
    name: 'Course',
    selector: 'title',
    sortable: true
  }, {
    name: 'Date Completed',
    selector: 'dateCompleted',
    sortable: true
  }],

  userQuizSubmissions: [{
    name: 'Course',
    selector: 'title',
    sortable: true
  }, {
    name: 'Date Enrolled',
    selector: 'createdAt',
    sortable: true
  }]
};

export {
  columnDefinitions
};