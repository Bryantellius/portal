import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const initialState = {
  submittedQuizzes: [],
  quiz: null,
  quizzes: []
};

export const submitQuiz = createAsyncThunk(
  'quiz/submit',
  async ({ userId, quizId, quizResponses }, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.post(`/quiz/${ quizId }`, { userId, quizId, responses: quizResponses });
  }
);

export const fetchQuiz = createAsyncThunk(
  'quiz/fetchQuiz',
  async (quizId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/quiz/${ quizId }`);
  }
);

export const fetchQuizzes = createAsyncThunk('quiz/fetchQuizzes',
  async (_, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get('/quiz');
  }
);

export const deleteQuiz = createAsyncThunk('quiz/deleteQuiz',
  async (quizId, thunkAPI) => {
    const apiClient = new ApiClient();
    await apiClient.delete(`/quiz/${ quizId }`);
    return quizId;
  }
);

export const saveQuiz = createAsyncThunk(
  'quiz/createQuiz',
  async (quiz, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const apiClient = new ApiClient();
    await (quiz.id
      ? apiClient.put(`/quiz/${ quiz.id }`, quiz)
      : apiClient.post(`/quiz`, quiz));

    dispatch(fetchQuizzes());
  }
)
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.submittedQuizzes = [
          ...state.submittedQuizzes.filter(quiz => quiz.id !== action.payload.quizId),
          action.payload
        ]
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = [
          ...state.quizzes.filter(quiz => quiz.id !== action.payload)
        ];

        state.isLoading = false;
      });
  }
});

export default quizSlice.reducer;