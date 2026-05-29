export type UserRole = "employee" | "hr_verifier" | "security_gate" | "admin";

export type AuthSession = {
  userId: string;
  displayName: string;
  employeeId: string;
  clearanceLevel: string;
  roles: UserRole[];
};
