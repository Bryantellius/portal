import { createSlice } from '@reduxjs/toolkit';
import initialState from './quiz.state';
import { submitQuiz, fetchUserQuizSubmissions } from './quiz.thunks';
import { upsertQuiz } from './quiz.reducers';
import { createAsyncEventHandlers } from '../../../utils/redux-helpers';
import { updateQuizSubmissions } from './quiz.reducers';

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    updateQuiz: upsertQuiz,
    updateQuizSubmissions
  },
  extraReducers: {
    [submitQuiz.fulfilled]: (state, { payload }) => {
      state.userSubmissions = state.userSubmissions || [];
      state.userSubmissions.push(payload);
    },
    [fetchUserQuizSubmissions.fulfilled]: (state, { payload }) => {
      state.userSubmissions = payload;
    }
  }
});

export const { updateQuiz } = quizSlice.actions;

export * from './quiz.thunks';

export default quizSlice.reducer;