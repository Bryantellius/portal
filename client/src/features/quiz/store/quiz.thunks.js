import { createAsyncThunk } from '@reduxjs/toolkit';
import quizService from '../quiz.service';

export const submitQuiz = createAsyncThunk(
  'quiz/submit',
  async ({ userId, quizId, quizResponses }) => {
    return await quizService.saveQuizSubmission(userId, quizId, quizResponses);
  }
);

export const fetchUserQuizSubmissions = createAsyncThunk(
  'quiz/getUserQuizSubmissions',
  async userId => {
    return await quizService.fetchSubmissionsByUserId(userId);
  }
);