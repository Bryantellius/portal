export const columnDefinitions = [{
  name: 'ID',
  selector: 'id',
  sortable: true,
  grow: 0
}, {
  name: 'Lecture',
  selector: 'lecture',
  sortable: true,
  format: row => row?.lecture?.title
}, {
  name: 'Questions',
  selector: 'questions',
  format: row => row?.quizQuestions?.length
}];