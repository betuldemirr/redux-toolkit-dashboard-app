import { User } from "@/models/user";
import { fetchUsers } from "@/services/users.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

type FetchUsersThunk = {
  returnType: User[];
  arg: void;
  rejectValue: string;
};

export const fetchUsersThunk = createAsyncThunk<
    FetchUsersThunk["returnType"],
    FetchUsersThunk["arg"],
    { rejectValue: FetchUsersThunk["rejectValue"] }
> ("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const users = await fetchUsers();
        return users;
    } catch (error) {
        return rejectWithValue(
        error instanceof Error
            ? error.message
            : "Failed to fetch users"
        );
    }
});