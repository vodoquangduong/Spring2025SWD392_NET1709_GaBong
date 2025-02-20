import { create } from "zustand";

const useUiStore = create<{
  isChatOpen: boolean;
  toogleChatPopup: () => void;
}>()((set, get) => ({
  isChatOpen: false,
  toogleChatPopup: () => {
    set((state) => ({
      isChatOpen: !state.isChatOpen,
    }));
  },
}));

export default useUiStore;
