export const upsertQuiz = ( state, { payload }) => {
  state.quiz = payload;
  state.quizzes = state.quizzes.filter(quiz => quiz.id !== payload.id);
  state.quizzes.push(payload);
  state.isLoading = false;
};

export const updateQuizzes = (state, { payload }) => {
  state.quizzes = payload;
  state.isLoading = false;
};

export const updateQuizSubmissions = (state, { payload }) => {
  state.userSubmissions = payload;
};

export const addQuizSubmission = (state, { payload }) => {
  state.userSubmissions.push(payload);
};

export const removeQuiz = (state, { payload }) => {
  state.quizzes = state.quizzes.filter(quiz => quiz.id !== payload);
};