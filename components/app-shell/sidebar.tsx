"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_ITEMS = [
  { label: "Dashboard", route: "/dashboard", icon: "dashboard", disabled: false },
  { label: "IT Risk Assessment", route: "/it-risk-assessment", icon: "security", disabled: true },
  { label: "Risk Register TI", route: "/risk-register", icon: "assignment", disabled: true },
  { label: "Import Risk Register", route: "/import-register", icon: "upload_file", disabled: true },
  { label: "Risk Control Library", route: "/control-library", icon: "library_books", disabled: true },
  { label: "Action Plan TI", route: "/action-plan", icon: "pending_actions", disabled: true },
  { label: "Approval Queue", route: "/approval-queue", icon: "fact_check", disabled: true },
  { label: "My Task / Worklist", route: "/worklist", icon: "task_alt", disabled: true },
  { label: "Reporting", route: "/reporting", icon: "assessment", disabled: true },
  { label: "Master Data", route: "/master-data", icon: "database", disabled: true },
  { label: "Audit Trail", route: "/audit-trail", icon: "history", disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-primary flex flex-col py-sm z-50 transition-all duration-300" id="sidebar">
        <div className="px-md mb-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="PNM Logo" className="w-[120px] h-auto object-contain mb-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrzZlIbizgIf_qa-91oQXnKRdKklG4yWSwrHzjJuev8s4VozcYIQgIMGAhYuPyKORl4YWYC2wb_iuIzx4tRGi2EMmVGfKH0n6dbD8IpRnsqDsBgRyWEnzoLqhmNFxO3-A4iMbaV6tvq48LL-8x_DNz0ThM4UOwhrJX9Qsu9iTS2ooB0tUFUQvCZNmyBFa7uwlAxI7s1Ki14oMAeDYNdSJHjObBIvP7xp1TEZBAT8ANVtCJuBduA31RYVsBbCTY8LjyNjDMGV804U0" />
            <div className="flex flex-col mt-0.5">
                <span className="font-headline-md text-[18px] font-bold text-on-primary leading-tight">SentinelRisk</span>
                <span className="font-label-sm text-[11px] text-on-primary-container tracking-wider opacity-80">Enterprise Governance</span>
            </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-xs space-y-0.5">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={`flex items-center px-sm py-1 rounded-r-md transition-all duration-200 group ${
                    isActive 
                      ? "sidebar-active" 
                      : "text-on-primary-container hover:bg-primary-container hover:text-secondary-fixed"
                  }`}
                  style={item.disabled ? { pointerEvents: "none", opacity: 0.6 } : undefined}
                >
                    <span className="material-symbols-outlined mr-sm text-[16px]">
                        {item.icon}
                    </span>
                    <span className="font-label-md text-[12px]">{item.label}</span>
                </Link>
              );
            })}
        </nav>
        
        <div className="px-md mt-2 pt-2 border-t border-primary-container">
            <span className="font-label-sm text-[10px] text-on-primary-container bg-primary-container px-2 py-0.5 rounded-full">Cycle 1 MVP</span>
        </div>
    </aside>
  );
}
