import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900">
        <Sidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 bg-zinc-950 p-6">
        {children}
      </main>
    </div>
  );
}