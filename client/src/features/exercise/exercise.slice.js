import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import exerciseService from './exercise.service';

export const fetchExerciseSubmissions = createAsyncThunk(
  'exercise/fetchSubmissions',
  async (_, thunkAPI) => {
    return await exerciseService.fetchExerciseSubmissions();
  }
);

export const fetchExerciseSubmission = createAsyncThunk(
  'exercise/fetchSubmission',
  async (submissionId, thunkAPI) => {
    return await exerciseService.fetchById(submissionId);
  }
);

export const fetchExerciseSubmissionsForUser = createAsyncThunk(
  'exercise/fetchSubmissionsForUser',
  async (userId, thunkAPI) => {
    return await exerciseService.fetchSubmissionsForUser(userId);
  }
)

export const submitExercise = createAsyncThunk(
  'exercise/submitExercise',
  async (submission, thunkAPI) => {
    return await exerciseService.submitExercise(submission);
  }
);

export const approveSubmission = createAsyncThunk(
  'exercise/approveSubmission',
async submissionId => {
    return await exerciseService.approveSubmission(submissionId);
  });

export const initialState = {
  submissions: [],
  submission: null,
  userSubmissions: []
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchExerciseSubmission.pending]: state => {
      state.isLoading = true
    },
    [fetchExerciseSubmission.fulfilled]: ( state, action ) => {
      state.submission = action.payload;
      state.isLoading = false;
    },
    [fetchExerciseSubmissions.pending]: state => {
      state.isLoading = true
    },
    [fetchExerciseSubmissions.fulfilled]: ( state, action ) => {
      state.submissions = action.payload;
      state.isLoading = false;
    },
    [fetchExerciseSubmissionsForUser.fulfilled]: (state, action) => {
      state.userSubmissions = action.payload;
    },
    [submitExercise.fulfilled]: (state, action) => {
      state.userSubmissions = [
        ...state.userSubmissions,
        action.payload
      ]
    }
  }
});

export default exerciseSlice.reducer;