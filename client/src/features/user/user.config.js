export const columnDefinitions = [{
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
    return row.role?.title || 'None'
  }
}];


