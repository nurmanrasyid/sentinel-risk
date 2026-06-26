"use client";

import { useState } from "react";
import { useCurrentUser } from "@/lib/context/user-context";
import { mockAssessmentList } from "@/lib/data/assessment-list";
import { getRiskRatingBadgeStyle, getStatusBadgeStyle } from "@/lib/data/risk-register";
import { toast } from "sonner";

export default function ITRiskAssessmentPage() {
  const user = useCurrentUser();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} is coming soon!`);
  };

  const filters = [
    { label: "Period", active: "2024 Q2" },
    { label: "Unit Kerja", active: null },
    { label: "Risk Owner", active: null },
    { label: "Context/Scope", active: null },
    { label: "Domain", active: null },
    { label: "Status", active: null },
    { label: "Risk Rating", active: "High" },
  ];

  return (
    <div className="h-full flex flex-col min-h-0 bg-surface-bg">
      {/* Header Area */}
      <div className="px-lg py-md border-b border-border-soft flex justify-between items-start shrink-0 bg-white">
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] font-display-lg text-on-surface leading-none mt-1">IT Risk Assessment</h1>
          <p className="text-[12px] font-body-md text-on-surface-variant">
            Manage and monitor risk lifecycle across IT divisions and assets.
          </p>
        </div>
        
        {user.roleCategory !== "viewer" && (
          <button 
            onClick={() => handleComingSoon("New Assessment")}
            className="flex items-center gap-1 bg-primary text-on-primary px-sm py-1.5 rounded-lg text-[12px] font-semibold hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Assessment
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="px-lg py-sm border-b border-border-soft flex items-center justify-between shrink-0 bg-surface-container-lowest">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {filters.map((f, i) => (
            <div 
              key={i}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium border cursor-pointer transition-colors ${
                f.active 
                  ? "bg-primary-container/10 border-primary/30 text-primary" 
                  : "bg-surface-container-lowest border-border-soft text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <span>{f.label}{f.active ? `: ${f.active}` : ""}</span>
              {f.active ? (
                <div 
                  className="p-0.5 hover:bg-primary/10 rounded-full flex items-center justify-center ml-0.5" 
                  onClick={(e) => { e.stopPropagation(); handleComingSoon("Clear Filter"); }}
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </div>
              ) : (
                <span className="material-symbols-outlined text-[14px] opacity-50 ml-0.5">expand_more</span>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={() => handleComingSoon("Clear All Filters")}
          className="text-[11px] font-semibold text-secondary hover:underline whitespace-nowrap ml-4"
        >
          Clear All Filters
        </button>
      </div>

      {/* Table Area */}
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-surface text-[11px] text-on-surface-variant sticky top-0 z-10 shadow-sm uppercase tracking-wider">
            <tr>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Assessment ID</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Period</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Context/Scope</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Risk Owner</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Risk Domain</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Inherent</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Residual</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Status</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft">Updated</th>
              <th className="px-md py-2 font-semibold border-b border-border-soft text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-on-surface divide-y divide-border-soft">
            {mockAssessmentList.map((entry) => (
              <tr key={entry.assessmentId} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-md py-2 font-medium text-secondary">
                  <button onClick={() => handleComingSoon(`View ${entry.assessmentId}`)} className="hover:underline">
                    {entry.assessmentId}
                  </button>
                </td>
                <td className="px-md py-2 text-on-surface-variant">
                  {entry.period}
                </td>
                <td className="px-md py-2">
                  <div className="font-medium text-on-surface">{entry.assetName}</div>
                  <div className="text-[10px] text-on-surface-variant mt-0.5">{entry.assetCategory}</div>
                </td>
                <td className="px-md py-2 text-on-surface-variant">
                  {entry.riskOwner}
                </td>
                <td className="px-md py-2 text-on-surface-variant">
                  {entry.riskDomain}
                </td>
                <td className="px-md py-2">
                  {entry.inherentRating ? (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getRiskRatingBadgeStyle(entry.inherentRating)}`}>
                      {entry.inherentRating}
                    </span>
                  ) : (
                    <span className="text-on-surface-variant italic text-[11px]">TBD</span>
                  )}
                </td>
                <td className="px-md py-2">
                  {entry.residualRating ? (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getRiskRatingBadgeStyle(entry.residualRating)}`}>
                      {entry.residualRating}
                    </span>
                  ) : (
                    <span className="text-on-surface-variant italic text-[11px]">TBD</span>
                  )}
                </td>
                <td className="px-md py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(entry.status)}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-md py-2 text-on-surface-variant text-[11px]">
                  {entry.lastUpdated}
                </td>
                <td className="px-md py-2 text-right relative">
                  <div className="relative inline-block text-left">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === entry.assessmentId ? null : entry.assessmentId);
                      }}
                      className="p-1 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded transition-colors"
                      title="Aksi"
                    >
                      <span className="material-symbols-outlined text-[16px]">more_vert</span>
                    </button>
                    
                    {openDropdownId === entry.assessmentId && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(null);
                          }}
                        />
                        <div className="absolute right-0 top-full mt-1 w-36 bg-inverse-surface rounded-md shadow-lg border border-border-soft transition-all z-50 overflow-hidden">
                          <div className="py-1 relative z-50">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(null);
                                handleComingSoon(`Lihat Detail ${entry.assessmentId}`);
                              }}
                              className="w-full text-left px-3 py-2 text-[12px] text-inverse-on-surface hover:bg-white/10 flex items-center gap-2 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[14px]">visibility</span>
                              Lihat Detail
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(null);
                                handleComingSoon(`Sunting Data ${entry.assessmentId}`);
                              }}
                              className="w-full text-left px-3 py-2 text-[12px] text-inverse-on-surface hover:bg-white/10 flex items-center gap-2 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[14px]">edit</span>
                              Sunting Data
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(null);
                                handleComingSoon(`Hapus Data ${entry.assessmentId}`);
                              }}
                              className="w-full text-left px-3 py-2 text-[12px] text-inverse-on-surface hover:bg-white/10 flex items-center gap-2 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[14px]">delete</span>
                              Hapus Data
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-md py-1.5 border-t border-border-soft flex justify-between items-center bg-surface-container-low shrink-0">
        <span className="text-[10px] text-on-surface-variant">
          Showing <span className="font-semibold text-on-surface">1</span> to <span className="font-semibold text-on-surface">5</span> of <span className="font-semibold text-on-surface">42</span> entries
        </span>
        <div className="flex items-center space-x-1">
          <button className="p-0.5 rounded hover:bg-surface-container-high transition-colors disabled:opacity-40" disabled={true}>
            <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          </button>
          <div className="flex items-center space-x-0.5 text-[11px]">
            <button className="w-5 h-5 rounded bg-primary text-on-primary font-semibold">1</button>
            <button className="w-5 h-5 rounded hover:bg-surface-container-high">2</button>
            <button className="w-5 h-5 rounded hover:bg-surface-container-high">3</button>
            <span className="px-1 text-on-surface-variant">...</span>
            <button className="w-5 h-5 rounded hover:bg-surface-container-high">5</button>
          </div>
          <button className="p-0.5 rounded hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
