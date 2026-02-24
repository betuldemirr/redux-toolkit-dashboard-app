import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "./users.thunks";
import { User } from "@/models/user";

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null, 
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        //UI events
    },
    extraReducers: (builder) => {
        builder
        //fetch
        .addCase(fetchUsersThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchUsersThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Unknown error";
        })
    }
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;