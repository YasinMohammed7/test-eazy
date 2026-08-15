export enum PolicyStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
}

export class Policy {
  id!: string;
  policyholderName!: string;
  propertyCity!: string;
  premiumAmount!: number;
  startDate!: string;
  endDate!: string;
  status!: PolicyStatus;
}
