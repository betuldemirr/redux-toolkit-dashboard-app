"use client";

import { useMemo, useState } from "react";
import { User } from "@/models/user";
import UserCard from "./UserCard";
import SearchInput from "@/app/components/SeachInput";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="space-y-6">
      <SearchInput value={search} onChange={setSearch} />

      {filteredUsers.length === 0 ? (
        <p className="text-sm text-zinc-400">No users found.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}