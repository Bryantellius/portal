export const columnDefinitions = [{
  title: 'ID',
  dataIndex: 'id',
  grow: 0
}, {
  title: 'Lecture',
  dataIndex: 'lecture',
  render: (_, row) => row?.lecture?.title
}, {
  title: 'Questions',
  dataIndex: 'questions',
  render: (_, row) => row?.quizQuestions?.length
}];