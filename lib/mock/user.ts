export type RoleCategory = "contributor" | "reviewer" | "approver" | "viewer";

export interface MockUser {
  name: string;
  roleLabel: string;
  roleCategory: RoleCategory;
}

// Hardcoded untuk testing App Shell — belum nyambung ke hasil mockLogin
export const mockCurrentUser: MockUser = {
  name: "RPH - Nurman Rasyid P H",
  roleLabel: "IT Risk Officer",
  roleCategory: "contributor",
};
