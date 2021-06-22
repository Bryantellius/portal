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
  state.quizSubmissions = payload;
};

export const addQuizSubmission = (state, { payload }) => {
  state.quizSubmissions.push(payload);
};

export const removeQuiz = (state, { payload }) => {
  state.quizzes = state.quizzes.filter(quiz => quiz.id !== payload);
};