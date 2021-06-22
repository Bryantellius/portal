import { createSlice } from '@reduxjs/toolkit';
import initialState from './quiz.state';
import { submitQuiz, fetchUserQuizSubmissions } from './quiz.thunks';
import { upsertQuiz, addQuizSubmission, updateQuizSubmissions } from './quiz.reducers';
import { createAsyncEventHandlers } from '../../../utils/redux-helpers';

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    updateQuiz: upsertQuiz
  },
  extraReducers: {
    ...createAsyncEventHandlers(submitQuiz, addQuizSubmission),
    ...createAsyncEventHandlers(fetchUserQuizSubmissions, updateQuizSubmissions)
  }
});

export const { updateQuiz } = quizSlice.actions;

export * from './quiz.thunks';

export default quizSlice.reducer;