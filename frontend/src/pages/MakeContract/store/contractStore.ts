import { create } from "zustand";

const useContractStore = create<{
  freelancerId: number;
  projectId: number;
  bidTotal: number;
  setSelected: (
    freelancerId: number,
    projectId: number,
    bidTotal: number
  ) => void;
}>()((set, get) => ({
  freelancerId: 0,
  projectId: 0,
  bidTotal: 0,
  setSelected: (freelancerId: number, projectId: number, bidTotal: number) =>
    set({
      freelancerId,
      projectId,
      bidTotal,
    }),
}));

export default useContractStore;
