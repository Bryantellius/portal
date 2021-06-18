import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiClient from '../../utils/apiClient';

export const fetchExerciseSubmissions = createAsyncThunk(
  'exercise/fetchSubmissions',
  async (_, thunkAPI) => {
    const apiClient = new ApiClient();
    return await apiClient.get(`/exercise/submission`);
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
  userSubmissions: []
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExerciseSubmissions.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchExerciseSubmissions.fulfilled, ( state, action ) => {
        state.submissions = action.payload;
        state.isLoading = false;
      })
      .addCase(submitExercise.fulfilled, (state, action) => {
        state.userSubmissions = [
          ...state.userSubmissions,
          action.payload
        ]
      })
      .addCase(fetchExerciseSuibmissionsForUser.fulfilled, (state, action) => {
        state.userSubmissions = action.payload;
      })
      .addCase(updateExerciseSubmission.fulfilled, (state, action) => {
        const submission = action.payload;
        state.userSubmissions = [
          ...state.userSubmissions.filter(existingSubmission => existingSubmission.id !== submission.id),
          submission
        ];
      });
  }
});

export default exerciseSlice.reducer;