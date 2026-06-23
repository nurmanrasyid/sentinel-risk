import { UserProvider } from "@/lib/context/user-context";
import { Sidebar } from "@/components/app-shell/sidebar";
import { TopHeader } from "@/components/app-shell/top-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-hidden flex flex-col min-h-0 bg-surface-bg">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}
