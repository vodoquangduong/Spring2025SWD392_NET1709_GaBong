import { create } from "zustand";

const useChatStore = create<{
  currentRoom: any;
  setCurrentRoom: (room: any) => void;
}>()((set, get) => ({
  currentRoom: "",
  setCurrentRoom: (currentRoom: any) => {
    set((state) => ({
      currentRoom,
    }));
  },
}));

export default useChatStore;
