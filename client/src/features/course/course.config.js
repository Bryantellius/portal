import moment from 'moment';

export const columnDefinitions = [{
  name: 'Title',
  selector: 'title',
  sortable: true,
  grow: 2
}, {
  name: 'Type',
  selector: 'type',
  sortable: true
}, {
  name: 'Start Date',
  selector: 'startDate',
  format: row => moment(row.startDate).format('MM/DD/YYYY'),
}, {
  name: 'End Date',
  selector: 'endDate',
  format: row => moment(row.startDate).format('MM/DD/YYYY')
}];