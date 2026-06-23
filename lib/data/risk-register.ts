export type RiskStatus = "Draft" | "Submitted" | "Reviewed" | "Approved" | "Rejected";
export type RiskRating = "Low" | "Medium" | "High" | "Very High";

export interface RiskRegisterEntry {
  id: string;              // contoh: "R-2024-001"
  riskSubject: string;     // contoh: "Data Breach via Unsecured API Endpoints"
  status: RiskStatus;
  inherentRiskRating: RiskRating;
  lastUpdated: string;     // format ISO date string, contoh: "2024-10-12"
}

export const mockRiskRegister: RiskRegisterEntry[] = [
  {
    id: "R-2024-001",
    riskSubject: "Data Breach via Unsecured API Endpoints",
    status: "Reviewed",
    inherentRiskRating: "Very High",
    lastUpdated: "2024-10-12",
  },
  {
    id: "R-2024-002",
    riskSubject: "Insider Threat: Unauthorized Access to Vault",
    status: "Draft",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-14",
  },
  {
    id: "R-2024-003",
    riskSubject: "Unauthorized access to core banking systems",
    status: "Approved",
    inherentRiskRating: "Very High",
    lastUpdated: "2024-10-15",
  },
  {
    id: "R-2024-004",
    riskSubject: "Data loss due to insufficient cloud backup",
    status: "Reviewed",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-16",
  },
  {
    id: "R-2024-005",
    riskSubject: "Excessive privilege assignments on LoanSys",
    status: "Draft",
    inherentRiskRating: "Medium",
    lastUpdated: "2024-10-17",
  },
  {
    id: "R-2024-006",
    riskSubject: "Phishing vulnerability in HR portal",
    status: "Reviewed",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-18",
  },
  {
    id: "R-2024-007",
    riskSubject: "Unpatched legacy server in Branch 04",
    status: "Approved",
    inherentRiskRating: "Very High",
    lastUpdated: "2024-10-19",
  },
  {
    id: "R-2024-008",
    riskSubject: "Insecure Wi-Fi configuration at HQ",
    status: "Draft",
    inherentRiskRating: "Medium",
    lastUpdated: "2024-10-20",
  },
  {
    id: "R-2024-009",
    riskSubject: "Lack of MFA for external contractors",
    status: "Reviewed",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-21",
  },
  {
    id: "R-2024-010",
    riskSubject: "Inadequate physical security at Data Center",
    status: "Approved",
    inherentRiskRating: "Low",
    lastUpdated: "2024-10-22",
  },
];

export const mockKpiSummary = {
  activeRisks: { value: 124, trend: "+8%", trendDirection: "up" as const },
  controlEfficacy: { value: "92%", label: "Stable" },
  approvals: { value: 3, label: "High", urgency: "high" as const },
  compliance: { value: "100%", label: "Audit Ready" },
};

export function getStatusBadgeStyle(status: RiskStatus): string {
  const map: Record<RiskStatus, string> = {
    Draft: "text-[#8A93A0] bg-[#EEF0F2]",
    Submitted: "text-[#2D7DD2] bg-[#E8F1FC]",
    Reviewed: "text-[#6E5BC4] bg-[#EFEBFA]",
    Approved: "text-[#2E9E5B] bg-[#E6F6EC]",
    Rejected: "text-[#D33A3A] bg-[#FCE6E6]",
  };
  return map[status];
}

export function getRiskRatingBadgeStyle(rating: RiskRating): string {
  const map: Record<RiskRating, string> = {
    Low: "text-[#2E9E5B] bg-[#E6F6EC]",
    Medium: "text-[#E5B400] bg-[#FFF6DD]",
    High: "text-[#E67A1F] bg-[#FFEEDD]",
    "Very High": "text-[#D33A3A] bg-[#FCE6E6]",
  };
  return map[rating];
}
