import { create } from "zustand";

const useUiStore = create<{
  isChatOpen: boolean;
  revalidate: boolean;
  toogleChatPopup: () => void;
  requestRevalidate: () => void;
}>()((set, get) => ({
  isChatOpen: false,
  revalidate: false,
  requestRevalidate: () => {
    set((state) => ({
      revalidate: !state.revalidate,
    }));
  },
  toogleChatPopup: () => {
    set((state) => ({
      isChatOpen: !state.isChatOpen,
    }));
  },
}));

export default useUiStore;
