import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/users';

// Thunks for asynchronous API calls
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createUser = createAsyncThunk('user/createUser', async (userData: { username: string; phone: string }) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, userData }: { id: number; userData: { username: string; phone: string } }) => {
  const response = await axios.patch(`${API_URL}/${id}`, userData);
  return response.data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return rejectWithValue('Cannot delete user. It may have related records.');
    }
    throw error;
  }
});

// Initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
