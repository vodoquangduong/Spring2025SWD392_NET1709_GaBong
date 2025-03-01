import { create } from "zustand";
import { NotifyService } from "../services/notifyService";
import { NotificationType } from "@/types/notification";

const useChatStore = create<{
  currentRoom: any;
  setCurrentRoom: (room: any) => void;
  notifyService: NotifyService | null;
  setNotifyService: (notifyService: NotifyService) => void;
  hasNewChatNotification: boolean;
  hasNewGlobalNotification: boolean;
  setNotification: (type: NotificationType) => void;
  readNotification: (type: NotificationType) => void;
}>()((set, get) => ({
  currentRoom: "",
  notifyService: null,
  hasNewChatNotification: false,
  hasNewGlobalNotification: false,
  setCurrentRoom: (currentRoom: any) => {
    set((state) => ({
      currentRoom,
    }));
  },

  setNotifyService: (notifyService: NotifyService) => {
    set((state) => ({
      notifyService,
    }));
  },

  setNotification: (type: NotificationType) => {
    if (type == NotificationType.NEW_MESSAGE) {
      set((state) => ({
        hasNewChatNotification: true,
      }));
    } else {
      set((state) => ({
        hasNewGlobalNotification: true,
      }));
    }
  },

  readNotification: (type: NotificationType) => {
    if (type == NotificationType.NEW_MESSAGE) {
      set((state) => ({
        hasNewChatNotification: false,
      }));
    } else {
      set((state) => ({
        hasNewGlobalNotification: false,
      }));
    }
  },
}));

export default useChatStore;
