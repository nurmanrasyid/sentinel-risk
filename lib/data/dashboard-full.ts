import { RiskRating } from "./risk-register";

export type HeatmapCell = { count: number; rating: RiskRating };

export const inherentRiskHeatmap: HeatmapCell[] = [
  { count: 4, rating: "High" }, { count: 12, rating: "Very High" }, { count: 8, rating: "Very High" }, { count: 5, rating: "Very High" }, { count: 2, rating: "Very High" },
  { count: 21, rating: "Medium" }, { count: 18, rating: "High" }, { count: 14, rating: "High" }, { count: 9, rating: "Very High" }, { count: 3, rating: "Very High" },
  { count: 45, rating: "Low" }, { count: 32, rating: "Medium" }, { count: 28, rating: "Medium" }, { count: 11, rating: "High" }, { count: 7, rating: "High" },
  { count: 68, rating: "Low" }, { count: 55, rating: "Low" }, { count: 41, rating: "Medium" }, { count: 22, rating: "Medium" }, { count: 15, rating: "Medium" },
  { count: 112, rating: "Low" }, { count: 94, rating: "Low" }, { count: 72, rating: "Low" }, { count: 48, rating: "Low" }, { count: 31, rating: "Medium" },
];

export const residualRiskHeatmap: HeatmapCell[] = [
  { count: 1, rating: "High" }, { count: 2, rating: "High" }, { count: 3, rating: "Very High" }, { count: 1, rating: "Very High" }, { count: 0, rating: "Very High" },
  { count: 12, rating: "Medium" }, { count: 9, rating: "Medium" }, { count: 5, rating: "High" }, { count: 4, rating: "High" }, { count: 2, rating: "Very High" },
  { count: 38, rating: "Low" }, { count: 22, rating: "Low" }, { count: 15, rating: "Medium" }, { count: 8, rating: "Medium" }, { count: 4, rating: "High" },
  { count: 85, rating: "Low" }, { count: 64, rating: "Low" }, { count: 42, rating: "Low" }, { count: 18, rating: "Medium" }, { count: 11, rating: "Medium" },
  { count: 245, rating: "Low" }, { count: 188, rating: "Low" }, { count: 120, rating: "Low" }, { count: 65, rating: "Low" }, { count: 42, rating: "Low" },
];

export const mockControlEffectiveness = 78;

export const mockExecutiveKpis = [
  { label: "Total Risk Register", value: "1,284", trend: "+2.4%", trendUp: true, icon: "Package", borderToken: "border-[#0B2A4A]", bgIconToken: "bg-[#0B2A4A]/10" },
  { label: "High Residual Risk", value: "42", trend: "+12%", trendUp: true, icon: "AlertTriangle", borderToken: "border-risk-very-high", bgIconToken: "bg-risk-very-high/10" },
  { label: "Action Plan Open", value: "156", trend: "84% Comp.", trendUp: null, icon: "ListTodo", borderToken: "border-[#0E7C86]", bgIconToken: "bg-[#0E7C86]/10" },
  { label: "Action Plan Overdue", value: "18", trend: "Critical", trendUp: null, icon: "TimerOff", borderToken: "border-status-overdue", bgIconToken: "bg-status-overdue/10" },
  { label: "Approval Pending", value: "29", trend: "Queue", trendUp: null, icon: "ClipboardCheck", borderToken: "border-status-reviewed", bgIconToken: "bg-status-reviewed/10" },
];

export const mockRiskByDomain = [
  { domain: "Cybersecurity", value: 342, percentage: 85, colorToken: "bg-[#0B2A4A]" },
  { domain: "IT Operations", value: 288, percentage: 70, colorToken: "bg-[#0E7C86]" },
  { domain: "Data Privacy", value: 195, percentage: 55, colorToken: "bg-status-reviewed" },
  { domain: "Third-Party Risk", value: 142, percentage: 40, colorToken: "bg-risk-high" },
];

export const mockCriticalAssetsCount = 14;

export interface TopResidualRisk {
  riskId: string;
  riskEvent: string;
  domain: string;
  asset: string;
  owner: string;
  rating: RiskRating;
  actionPlanStatus: "Open" | "Overdue" | "Closed";
}

export const mockTopResidualRisks: TopResidualRisk[] = [
  { riskId: "R-IT-2024-001", riskEvent: "Unauthorized Data Exfiltration via Removable Media", domain: "Cybersecurity", asset: "Core Banking DB", owner: "Adi Pratama", rating: "Very High", actionPlanStatus: "Open" },
  { riskId: "R-IT-2024-042", riskEvent: "Downtime in Cloud Infrastructure Providers", domain: "IT Operations", asset: "AWS Instance 01", owner: "Siti Aminah", rating: "High", actionPlanStatus: "Overdue" },
  { riskId: "R-IT-2024-118", riskEvent: "Inadequate Access Control for Internal Users", domain: "Identity Mgmt", asset: "ERP System", owner: "Budi Hartono", rating: "High", actionPlanStatus: "Closed" },
  { riskId: "R-IT-2024-089", riskEvent: "Phishing Attacks Targeted at Management", domain: "Cybersecurity", asset: "Email Gateway", owner: "Adi Pratama", rating: "Medium", actionPlanStatus: "Open" },
  { riskId: "R-IT-2024-201", riskEvent: "Non-compliance with Data Residency Laws", domain: "Data Privacy", asset: "Customer DB", owner: "Rina Wijaya", rating: "High", actionPlanStatus: "Open" },
];
