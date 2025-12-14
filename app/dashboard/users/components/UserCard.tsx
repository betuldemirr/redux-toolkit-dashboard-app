import { User } from "@/models/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <li className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h3 className="text-sm font-medium">{user.name}</h3>

      <p className="mt-1 text-xs text-zinc-400">
        @{user.username}
      </p>

      <p className="mt-3 text-sm text-zinc-300">
        {user.email}
      </p>
    </li>
  );
}