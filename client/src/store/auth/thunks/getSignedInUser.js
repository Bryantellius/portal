import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../../utils/apiClient';
import { setUser } from '../reducers/authReducer';
const apiClient = new ApiClient();

const getSignedInUser = async () => {
  const apiUser = await apiClient.get(`/user/profile`);
  return {
    id: apiUser.id,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    email: apiUser.email,
    role: apiUser.Role?.title,
    lastLectureId: apiUser.lastLectureId,
    course: apiUser.course
  };
};

const getSignedInUserThunk = createAsyncThunk('user/getSignedInUser', async (_, { dispatch }) => {
  const user = await getSignedInUser();
  dispatch(setUser(user));
  return user;
});

export default getSignedInUserThunk();