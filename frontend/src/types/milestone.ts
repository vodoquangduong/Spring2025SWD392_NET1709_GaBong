export enum MilestoneStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  SUBMITTED = 2,
  COMPLETED = 3,
  CANCELLED = 4,
}

export type CreateMilestoneDTO = {
  milestoneName: string;
  description: string;
  amount: number;
  deadline: string;
};

export interface Milestone {
  milestoneId: string;
  milestoneName: string;
  milestoneDescription: string;
  amount: number;
  deadlineDate: string;
  payAmount: number;
  projectId: string;
  status: MilestoneStatus;
}
