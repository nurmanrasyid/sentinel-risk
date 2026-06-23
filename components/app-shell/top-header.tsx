"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/context/user-context";
import { useState } from "react";
import { toast } from "sonner";

export function TopHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { name, roleLabel } = useCurrentUser();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  let pageTitle = "Dashboard";
  if (pathname === "/dashboard") {
    pageTitle = "Dashboard Overview";
  } else if (pathname === "/dashboard/full") {
    pageTitle = "Full Dashboard";
  } else {
    pageTitle = pathname.split("/").pop()?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Dashboard";
  }

  return (
    <header className="shrink-0 h-14 bg-surface shadow-sm border-b border-border-soft flex justify-between items-center px-md z-40">
        <div className="flex items-center space-x-sm">
            <div className="flex flex-col">
                <nav className="flex items-center text-on-surface-variant text-[11px] mb-0.5">
                    <span className="">Home</span>
                    <span className="material-symbols-outlined text-[14px] mx-0.5">chevron_right</span>
                    <span className="text-secondary font-semibold">{pathname === "/dashboard" ? "Dashboard" : pageTitle}</span>
                </nav>
                <h1 className="font-headline-md text-[18px] text-on-surface leading-none">{pageTitle}</h1>
            </div>
        </div>
        
        <div className="flex items-center space-x-md">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-64' : 'w-56'}`}>
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input 
                  className="w-full pl-[32px] pr-sm py-1.5 bg-surface-container-low border border-border-soft rounded-lg text-[13px] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" 
                  placeholder="Search risks, controls..." 
                  type="text"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
            </div>
            
            <div className="flex items-center space-x-sm">
                <button 
                  onClick={() => toast.info("Full Dashboard is coming soon!")}
                  className="flex items-center space-x-1 border border-secondary text-secondary px-2 py-1 rounded-lg text-[12px] font-semibold hover:bg-secondary-container/20 transition-all"
                >
                    <span className="material-symbols-outlined text-[16px]">dashboard_customize</span>
                    <span className="">View Full Dashboard</span>
                </button>
                <button className="relative hover:bg-surface-container-low p-1.5 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">notifications</span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                </button>
                <div className="flex items-center space-x-sm pl-sm border-l border-border-soft relative group cursor-pointer">
                    <div className="text-right">
                        <p className="font-label-md text-[12px] text-on-surface leading-tight">{name}</p>
                        <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{roleLabel}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    </div>

                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border-soft rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="p-1">
                        <button 
                          onClick={() => router.push("/login")}
                          className="w-full text-left px-3 py-2 text-[13px] font-body-md text-error hover:bg-error-container/50 rounded-sm flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>logout</span>
                          Logout
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
