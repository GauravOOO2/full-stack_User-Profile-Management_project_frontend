import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Profile {
  userId: number; // Ensure userId is included here
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  username?: string; // Add this if you want to access username
}

const API_URL = 'http://localhost:4000/api/profiles';

// Thunks for asynchronous API calls
export const fetchProfiles = createAsyncThunk('profile/fetchProfiles', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData: Profile) => {
    const response = await axios.post(API_URL, profileData);
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, profileData }: { userId: number; profileData: Profile }) => {
    const response = await axios.patch(`${API_URL}/${userId}`, profileData);
    return response.data;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (userId: number) => {
    await axios.delete(`${API_URL}/${userId}`);
    return userId;
  }
);

export const fetchProfileByUserId = createAsyncThunk('profile/fetchProfileByUserId', async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Return null if profile doesn't exist
    }
    throw error;
  }
});

// Initial state
const initialState = {
  profiles: [] as Profile[], // Specify the type for profiles
  status: 'idle',
  error: null,
};

// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(profile => profile.userId === action.payload.userId);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter(profile => profile.userId !== action.payload);
      })
      .addCase(fetchProfileByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const index = state.profiles.findIndex(profile => profile.userId === action.payload.userId);
          if (index !== -1) {
            state.profiles[index] = action.payload;
          } else {
            state.profiles.push(action.payload);
          }
        }
      })
      .addCase(fetchProfileByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
