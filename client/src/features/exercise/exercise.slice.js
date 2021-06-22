import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const fetchExerciseSubmissions = createAsyncThunk(
  'exercise/fetchSubmissions',
  async (_, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/exercise/submission`);
  }
);

export const fetchExerciseSubmission = createAsyncThunk(
  'exercise/fetchSubmission',
  async (submissionId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/exercise/submission/${ submissionId }`);
  }
);


export const fetchExerciseSuibmissionsForUser = createAsyncThunk(
  'exercise/fetchSubmissionsForUser',
  async (userId, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/user/${ userId }/exercise/submission`);
  }
)

export const submitExercise = createAsyncThunk(
  'exercise/submitExercise',
  async ({ exerciseId, repoUrl, userId }, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.post(`/exercise`, { repoUrl, userId, exerciseId });
  }
);

export const updateExerciseSubmission = createAsyncThunk(
  'exercise/updateSubmission',
  async ({ exerciseId, repoUrl, userId }, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.put(`/exercise/${ exerciseId }`, { repoUrl, userId, exerciseId });
  }
);

export const approveSubmission = createAsyncThunk(
  'exercise/approveSubmission',
  async (id, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.post(`/exercise/submission/${ id }/approve`);
  }
);

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
    [submitExercise.fulfilled]: (state, action) => {
      state.userSubmissions = [
        ...state.userSubmissions,
        action.payload
      ]
    },
    [fetchExerciseSuibmissionsForUser.fulfilled]: (state, action) => {
      state.userSubmissions = action.payload;
    },
    [updateExerciseSubmission.fulfilled]: (state, action) => {
      const submission = action.payload;
      state.userSubmissions = [
        ...state.userSubmissions.filter(existingSubmission => existingSubmission.id !== submission.id),
        submission
      ];
    }
  }
});

export default exerciseSlice.reducer;