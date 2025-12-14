"use client";

import { useEffect, useState } from "react";
import { User } from "@/models/user";
import { fetchUsers } from "@/services/users.api";
import UserList from "./components/UserList";
import LoadingState from "@/app/components/LoadingState";
import ErrorState from "@/app/components/ErrorState";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <LoadingState type="user" count={6} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load users"
        message={error}
        onRetry={loadUsers}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="text-sm text-zinc-400">
          Browse and manage users
        </p>
      </div>

      <UserList users={users} />
    </div>
  );
}