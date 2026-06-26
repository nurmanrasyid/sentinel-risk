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
        <footer className="shrink-0 px-md py-1.5 bg-white border-t border-border-soft flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40">
          <div className="flex gap-md">
            <span>System Status: Optimal</span>
            <span>Last Compliance Sync: 45m ago</span>
          </div>
          <div>© 2024 SentinelRisk Precision Governance</div>
        </footer>
      </div>
    </UserProvider>
  );
}
