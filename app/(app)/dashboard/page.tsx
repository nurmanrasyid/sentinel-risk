"use client";

import { useCurrentUser } from "@/lib/context/user-context";
import { mockRiskRegister, mockKpiSummary, getStatusBadgeStyle, getRiskRatingBadgeStyle } from "@/lib/data/risk-register";
import { toast } from "sonner";
import Link from "next/link";

export default function DashboardPage() {
  const { name } = useCurrentUser();

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} is coming soon!`);
  };

  return (
    <div className="h-full flex flex-col gap-sm p-sm min-h-0">
        <div className="grid grid-cols-12 gap-sm shrink-0">
            <div className="col-span-12 lg:col-span-8">
                <div className="glass-card rounded-xl p-sm relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="relative z-10 max-w-lg">
                        <h2 className="font-display-lg text-[18px] text-on-surface mb-1">Welcome back, {name}.</h2>
                        <p className="font-body-md text-[12px] text-on-surface-variant mb-sm leading-normal">
                            Your risk assessment cycle is currently 74% complete. There are 3 high-priority items requiring your approval today to maintain compliance with the Cycle 1 MVP roadmap.
                        </p>
                        <div className="flex space-x-sm">
                            <button 
                                onClick={() => handleComingSoon("Continue Assessment")}
                                className="bg-primary-container text-on-primary px-sm py-1 rounded-lg text-[12px] font-semibold hover:opacity-90 transition-all flex items-center"
                            >
                                Continue Assessment
                                <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                            </button>
                            <Link 
                                href="/dashboard/full"
                                className="border border-secondary text-secondary px-sm py-1 rounded-lg text-[12px] font-semibold hover:bg-secondary-container/20 transition-all flex items-center"
                            >
                                View Full Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-secondary opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute right-8 top-4 opacity-10">
                        <span className="material-symbols-outlined text-[120px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                    </div>
                </div>
            </div>
            
            <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-sm">
                <div className="bg-surface-container-lowest border border-border-soft rounded-xl p-sm flex flex-col justify-between shadow-sm">
                    <div>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">Active Risks</span>
                        <div className="mt-0.5">
                            <span className="font-display-lg text-[20px] text-on-surface leading-none">{mockKpiSummary.activeRisks.value}</span>
                            <div className="flex items-center text-risk-very-high text-[10px] font-bold mt-0.5">
                                <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> {mockKpiSummary.activeRisks.trend}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-container-lowest border border-border-soft rounded-xl p-sm flex flex-col justify-between shadow-sm">
                    <div>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">Control Efficacy</span>
                        <div className="mt-0.5">
                            <span className="font-display-lg text-[20px] text-on-surface leading-none">{mockKpiSummary.controlEfficacy.value}</span>
                            <div className="flex items-center text-risk-low text-[10px] font-bold mt-0.5">
                                <span className="material-symbols-outlined text-[12px] mr-0.5">check_circle</span> {mockKpiSummary.controlEfficacy.label}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-container-lowest border border-border-soft rounded-xl p-sm flex flex-col justify-between shadow-sm">
                    <div>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">Approvals</span>
                        <div className="mt-0.5">
                            <span className="font-display-lg text-[20px] text-on-surface leading-none">0{mockKpiSummary.approvals.value}</span>
                            <div className="flex items-center text-risk-high text-[10px] font-bold mt-0.5">
                                <span className="material-symbols-outlined text-[12px] mr-0.5">priority_high</span> {mockKpiSummary.approvals.label}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-surface-container-lowest border border-border-soft rounded-xl p-sm flex flex-col justify-between shadow-sm">
                    <div>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">Compliance</span>
                        <div className="mt-0.5">
                            <span className="font-display-lg text-[20px] text-on-surface leading-none">{mockKpiSummary.compliance.value}</span>
                            <div className="flex items-center text-risk-low text-[10px] font-bold mt-0.5">
                                <span className="material-symbols-outlined text-[12px] mr-0.5">verified</span> {mockKpiSummary.compliance.label}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 flex flex-col bg-surface-container-lowest border border-border-soft rounded-xl shadow-sm overflow-hidden min-h-0">
            <div className="px-md py-1.5 border-b border-border-soft flex justify-between items-center bg-surface-container-low shrink-0">
                <h3 className="font-headline-sm text-[14px] text-on-surface">Recent Risk Activity</h3>
                <button 
                    onClick={() => handleComingSoon("View Full Register")}
                    className="text-secondary font-label-md text-[11px] flex items-center hover:underline"
                >
                    View Full Register
                    <span className="material-symbols-outlined ml-1 text-[14px]">open_in_new</span>
                </button>
            </div>
            
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar relative">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-surface text-[11px] text-on-surface-variant sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-md py-1.5 font-semibold border-b border-border-soft">ID</th>
                            <th className="px-md py-1.5 font-semibold border-b border-border-soft">Risk Subject</th>
                            <th className="px-md py-1.5 font-semibold border-b border-border-soft">Status</th>
                            <th className="px-md py-1.5 font-semibold border-b border-border-soft">Inherent Risk</th>
                            <th className="px-md py-1.5 font-semibold border-b border-border-soft">Last Updated</th>
                            <th className="px-md py-1.5 font-semibold border-b border-border-soft text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-[12px] text-on-surface divide-y divide-border-soft">
                        {mockRiskRegister.map(risk => {
                            let ratingBgClass = "bg-risk-low";
                            if (risk.inherentRiskRating === "Very High") ratingBgClass = "bg-risk-very-high";
                            if (risk.inherentRiskRating === "High") ratingBgClass = "bg-risk-high";
                            if (risk.inherentRiskRating === "Medium") ratingBgClass = "bg-risk-medium";

                            return (
                                <tr key={risk.id} className="hover:bg-surface-container-low transition-colors group">
                                    <td className="px-md py-1.5 font-medium text-secondary">
                                        <button onClick={() => handleComingSoon(`View Risk ${risk.id}`)} className="hover:underline">
                                            {risk.id}
                                        </button>
                                    </td>
                                    <td className="px-md py-1.5">{risk.riskSubject}</td>
                                    <td className="px-md py-1.5">
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(risk.status)}`}>
                                            {risk.status}
                                        </span>
                                    </td>
                                    <td className="px-md py-1.5">
                                        <div className="flex items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-sm ${ratingBgClass}`}></div>
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getRiskRatingBadgeStyle(risk.inherentRiskRating)}`}>
                                                {risk.inherentRiskRating === "Very High" ? "Critical" : risk.inherentRiskRating}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-md py-1.5 text-on-surface-variant text-[11px]">{risk.lastUpdated}</td>
                                    <td className="px-md py-1.5 text-right">
                                        <button onClick={() => handleComingSoon("Actions")} className="material-symbols-outlined text-on-surface-variant hover:text-primary text-[16px]">more_vert</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="px-md py-1 border-t border-border-soft flex justify-between items-center bg-surface-container-low shrink-0">
                <span className="text-[10px] text-on-surface-variant">Showing 10 of 1,284 entries</span>
                <div className="flex items-center space-x-1">
                    <button className="p-0.5 rounded hover:bg-surface-container-high transition-colors disabled:opacity-40" disabled={true}>
                        <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    </button>
                    <div className="flex items-center space-x-0.5 text-[11px]">
                        <button className="w-5 h-5 rounded bg-primary text-on-primary font-semibold">1</button>
                        <button className="w-5 h-5 rounded hover:bg-surface-container-high">2</button>
                        <button className="w-5 h-5 rounded hover:bg-surface-container-high">3</button>
                        <span className="px-1 text-on-surface-variant">...</span>
                        <button className="w-5 h-5 rounded hover:bg-surface-container-high">129</button>
                    </div>
                    <button className="p-0.5 rounded hover:bg-surface-container-high transition-colors">
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
