import { RiskRating, RiskStatus } from "./risk-register";

export interface AssessmentListEntry {
  assessmentId: string;
  period: string;
  assetName: string;
  assetCategory: string;
  riskOwner: string;
  riskDomain: string;
  inherentRating: RiskRating | null; // null = belum diisi
  residualRating: RiskRating | null; // null = "TBD", biasanya saat status masih Draft
  status: RiskStatus;
  lastUpdated: string;
}

export const mockAssessmentList: AssessmentListEntry[] = [
  { assessmentId: "ASM-2024-001", period: "2024 Q1", assetName: "Core Banking System", assetCategory: "IT Infrastructure", riskOwner: "Budi Santoso", riskDomain: "Security", inherentRating: "Very High", residualRating: "Medium", status: "Approved", lastUpdated: "22 May 2024" },
  { assessmentId: "ASM-2024-004", period: "2024 Q2", assetName: "Mobile Banking API", assetCategory: "App Dev", riskOwner: "Siti Aminah", riskDomain: "Availability", inherentRating: "High", residualRating: "Low", status: "Reviewed", lastUpdated: "18 May 2024" },
  { assessmentId: "ASM-2024-007", period: "2024 Q2", assetName: "CRM Cloud Gateway", assetCategory: "External Services", riskOwner: "Rahmat Hidayat", riskDomain: "Compliance", inherentRating: "Medium", residualRating: "Low", status: "Submitted", lastUpdated: "15 May 2024" },
  { assessmentId: "ASM-2024-012", period: "2024 Q3", assetName: "Internal Data Warehouse", assetCategory: "Data Platform", riskOwner: "Aditya Dharma", riskDomain: "Integrity", inherentRating: "High", residualRating: null, status: "Draft", lastUpdated: "Today, 10:45" },
  { assessmentId: "ASM-2024-002", period: "2024 Q1", assetName: "Legacy ERP Portal", assetCategory: "Enterprise Apps", riskOwner: "Maya Putri", riskDomain: "Operations", inherentRating: "High", residualRating: "Medium", status: "Rejected", lastUpdated: "12 May 2024" },
];
