"use client";

import React from "react";
import Link from "next/link";
import { 
  Download, 
  Plus, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  ListTodo, 
  TimerOff, 
  ClipboardCheck, 
  ShieldCheck, 
  ListFilter, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  MessageCircle,
  TrendingDown
} from "lucide-react";
import { HeatmapGrid } from "@/components/dashboard/heatmap-grid";
import { DonutChart } from "@/components/dashboard/donut-chart";
import { 
  inherentRiskHeatmap, 
  residualRiskHeatmap, 
  mockControlEffectiveness, 
  mockExecutiveKpis, 
  mockRiskByDomain, 
  mockCriticalAssetsCount, 
  mockTopResidualRisks 
} from "@/lib/data/dashboard-full";
import { getRiskRatingBadgeStyle } from "@/lib/data/risk-register";
import { toast } from "sonner";

export default function FullDashboardPage() {
  const handleComingSoon = () => {
    toast.info("Coming Soon");
  };

  return (
    <div className="h-full overflow-y-auto p-md space-y-sm bg-surface-bg custom-scrollbar relative">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-sm rounded-lg border border-border-soft">
        <div>
          <h1 className="text-display-lg-mobile font-bold text-[#0B2A4A] tracking-tight">Executive Risk Dashboard</h1>
          <p className="text-sm text-on-surface-variant italic mt-0.5">Snapshot for Risk Management Cycle - Q3 2024</p>
        </div>
        <div className="flex items-center space-x-sm">
          <select className="px-sm py-1.5 rounded-md border border-outline-variant text-sm text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-primary-container">
            <option>Q3 2024 (Current)</option>
            <option>Q2 2024</option>
            <option>Q1 2024</option>
            <option>FY 2023</option>
          </select>
          <button 
            onClick={handleComingSoon}
            className="flex items-center px-sm py-1.5 rounded-md border border-outline-variant text-sm font-semibold hover:bg-surface-variant transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={handleComingSoon}
            className="flex items-center px-sm py-1.5 rounded-md bg-[#0E7C86] text-white text-sm font-semibold hover:bg-[#0b626a] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Risk Assessment
          </button>
        </div>
      </div>

      {/* Row 1: Heatmap Analysis & Control Effectiveness */}
      <div className="grid grid-cols-12 gap-sm">
        {/* Heatmap Analysis (col-span-9) */}
        <div className="col-span-9 bg-white p-sm rounded-lg border border-border-soft flex flex-col">
          <h2 className="text-headline-sm font-semibold text-[#0B2A4A] mb-4">Risk Profile Heatmap</h2>
          <div className="flex-1 grid grid-cols-2 gap-md">
            {/* Inherent Heatmap */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold mb-2">Inherent Risk Heatmap</span>
              <HeatmapGrid data={inherentRiskHeatmap} />
              <div className="flex justify-between w-full max-w-[400px] mt-2 px-1">
                <span className="text-[11px] text-on-surface-variant">Insignificant</span>
                <span className="text-[11px] text-on-surface-variant">Extreme</span>
              </div>
            </div>
            {/* Residual Heatmap */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold mb-2">Residual Risk Heatmap</span>
              <HeatmapGrid data={residualRiskHeatmap} />
              <div className="flex justify-between w-full max-w-[400px] mt-2 px-1">
                <span className="text-[11px] text-on-surface-variant">Insignificant</span>
                <span className="text-[11px] text-on-surface-variant">Extreme</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Effectiveness & Risk Trend (col-span-3) */}
        <div className="col-span-3 flex flex-col space-y-sm">
          {/* Control Effectiveness */}
          <div className="bg-white p-sm rounded-lg border border-border-soft flex-1 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Control Effectiveness</h3>
            <DonutChart percentage={mockControlEffectiveness} />
            <p className="text-xs text-on-surface-variant mt-3 px-2">Controls operating effectively across critical assets.</p>
          </div>
          {/* Risk Trend */}
          <div className="bg-white p-sm rounded-lg border border-border-soft flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Risk Trend (6M)</h3>
            <div className="flex-1 w-full flex items-end justify-center pb-2 relative min-h-[80px]">
              {/* Static SVG for trend */}
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E7C86" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0E7C86" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,30 Q20,35 40,20 T80,15 T100,5 L100,40 L0,40 Z" fill="url(#trendGradient)" />
                <path d="M0,30 Q20,35 40,20 T80,15 T100,5" fill="none" stroke="#0E7C86" strokeWidth="2" />
              </svg>
              <div className="flex justify-between w-full mt-auto relative z-10 px-1">
                <span className="text-[10px] text-on-surface-variant">Mar</span>
                <span className="text-[10px] text-on-surface-variant">Aug</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 5 KPI Cards */}
      <div className="grid grid-cols-5 gap-sm">
        {mockExecutiveKpis.map((kpi, idx) => {
          let IconComp: any = Package;
          if (kpi.icon === "AlertTriangle") IconComp = AlertTriangle;
          if (kpi.icon === "ListTodo") IconComp = ListTodo;
          if (kpi.icon === "TimerOff") IconComp = TimerOff;
          if (kpi.icon === "ClipboardCheck") IconComp = ClipboardCheck;

          return (
            <div key={idx} className={`bg-white p-sm rounded-lg border border-border-soft border-l-[4px] ${kpi.borderToken} flex flex-col relative`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-on-surface-variant">{kpi.label}</span>
                <div className={`p-1 rounded-md ${kpi.bgIconToken}`}>
                  <IconComp className="w-4 h-4 opacity-80" />
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-2xl font-bold text-text-primary">{kpi.value}</span>
                {kpi.trendUp !== null ? (
                  <div className={`flex items-center text-[11px] font-semibold ${kpi.trendUp ? 'text-status-overdue' : 'text-risk-low'}`}>
                    {kpi.trendUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {kpi.trend}
                  </div>
                ) : (
                  <span className="text-[11px] font-semibold text-on-surface-variant">{kpi.trend}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 3: Risk by Domain & Critical Assets */}
      <div className="grid grid-cols-12 gap-sm">
        <div className="col-span-8 bg-white p-sm rounded-lg border border-border-soft">
          <h2 className="text-sm font-semibold text-[#0B2A4A] mb-4">Risk by Domain</h2>
          <div className="space-y-4">
            {mockRiskByDomain.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-text-primary">{item.domain}</span>
                  <span className="text-on-surface-variant font-semibold">{item.value}</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className={`${item.colorToken} h-1.5 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 bg-[#0B2A4A] text-white p-md rounded-lg flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 pattern-bg opacity-10 pointer-events-none"></div>
          <ShieldCheck className="w-10 h-10 mb-3 opacity-90 text-[#0E7C86]" />
          <span className="text-4xl font-bold mb-1">{mockCriticalAssetsCount}</span>
          <span className="text-sm text-on-primary-container">Assets with High Residual Risk</span>
        </div>
      </div>

      {/* Row 4: Top 5 Residual Risks */}
      <div className="bg-white rounded-lg border border-border-soft overflow-hidden">
        <div className="p-sm border-b border-border-soft flex justify-between items-center bg-surface-bright">
          <h2 className="text-sm font-semibold text-[#0B2A4A]">Top 5 Residual Risks</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-on-surface-variant italic">Showing highest residual impact items</span>
            <button className="text-[#0B2A4A] hover:opacity-80 transition-opacity">
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-container-highest text-on-surface-variant text-xs">
              <tr>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Risk ID</th>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Risk Event</th>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Domain</th>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Asset</th>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Owner</th>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Rating</th>
                <th className="px-sm py-2 font-semibold border-b border-border-soft">Action Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {mockTopResidualRisks.map((risk) => {
                let statusIcon = <Clock className="w-3.5 h-3.5 mr-1 text-risk-high" />;
                let statusClass = "text-risk-high";
                if (risk.actionPlanStatus === "Overdue") {
                  statusIcon = <AlertCircle className="w-3.5 h-3.5 mr-1 text-status-overdue" />;
                  statusClass = "text-status-overdue";
                } else if (risk.actionPlanStatus === "Closed") {
                  statusIcon = <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-risk-low" />;
                  statusClass = "text-risk-low";
                }

                return (
                  <tr key={risk.riskId} className="hover:bg-surface-bg transition-colors">
                    <td className="px-sm py-2 font-medium text-text-primary">{risk.riskId}</td>
                    <td className="px-sm py-2 text-text-primary max-w-[200px] truncate" title={risk.riskEvent}>{risk.riskEvent}</td>
                    <td className="px-sm py-2 text-on-surface-variant">{risk.domain}</td>
                    <td className="px-sm py-2 text-on-surface-variant">{risk.asset}</td>
                    <td className="px-sm py-2 text-on-surface-variant">{risk.owner}</td>
                    <td className="px-sm py-2">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${getRiskRatingBadgeStyle(risk.rating)}`}>
                        {risk.rating}
                      </span>
                    </td>
                    <td className="px-sm py-2">
                      <div className={`flex items-center text-xs font-medium ${statusClass}`}>
                        {statusIcon}
                        {risk.actionPlanStatus}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-3 text-center border-t border-border-soft">
          <Link href="/risk-register" className="text-sm text-[#0E7C86] hover:underline">
            View All Risk Register Items
          </Link>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        onClick={handleComingSoon}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0B2A4A] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 hover:scale-105 transition-all z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

    </div>
  );
}
