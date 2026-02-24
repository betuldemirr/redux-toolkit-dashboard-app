import { RootState } from "@/store/store";

/**
 * Base selector
 */
export const selectUsersState = (state: RootState) => state.users;

/**
 * Data selectors
 */
export const selectUsers = (state: RootState) =>
  selectUsersState(state).items;

export const selectUsersLoading = (state: RootState) =>
  selectUsersState(state).loading;

export const selectUsersError = (state: RootState) =>
  selectUsersState(state).error;