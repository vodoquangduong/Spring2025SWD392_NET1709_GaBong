export interface PaymentPolicy {
  projectFee: number;
  bidFee: number;
  withdrawalFee: number;
}

export interface ReputationPolicy {
  beforeDeadline: number;
  rightDeadline: number;
  earlylateDeadline: number;
  lateDeadline: number;
  completeProject: number;
}

export interface SystemConfig {
  paymentPolicy: PaymentPolicy;
  reputationPolicy: ReputationPolicy;
}
