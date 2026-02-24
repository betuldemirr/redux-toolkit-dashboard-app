"use client";

import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import LoadingState from "@/app/components/LoadingState";
import ErrorState from "@/app/components/ErrorState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  fetchUsersThunk,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from "@/modules/users";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersThunk());
    }
  }, [dispatch, users.length]);

  if (loading) {
    return <LoadingState type="user" count={6} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load users"
        message={error}
        onRetry={() => dispatch(fetchUsersThunk())}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="text-sm text-zinc-400">Browse and manage users</p>
      </div>

      <UserList users={users} />
    </div>
  );
}