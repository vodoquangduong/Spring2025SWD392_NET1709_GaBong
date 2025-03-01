import React, { useEffect, useRef, useState } from "react";
import ChatList from "./partials/ChatList";
import ChatBox from "./partials/ChatBox";
import { IoClose } from "react-icons/io5";
import useUiStore from "@/stores/uiStore";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import { AnimatePresence, motion } from "motion/react";
import useChatStore from "./stores/chatStore";
export default function ChatPopup() {
  const { currentRoom, setCurrentRoom } = useChatStore();
  const { toogleChatPopup, isChatOpen } = useUiStore();
  const { accountId } = useAuthStore();
  const popupRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["chatList"],
    queryFn: async () => {
      const data = await GET(`/api/ChatRoom/${accountId}`, false);
      if (!currentRoom) {
        setCurrentRoom(data[0]);
      }
      return data;
    },
    staleTime: 0,
  });

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        if (isChatOpen) {
          toogleChatPopup();
        }
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen, toogleChatPopup]);

  // Animation variants
  const popupVariants = {
    hidden: {
      opacity: 0,
      y: 1000,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={popupRef}
        className="fixed bottom-0 right-24 w-[800px] h-[600px] z-40 grid grid-cols-3 border-2 border-b-0 dark:border-zinc-700"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="visible"
        // exit="hidden"
      >
        <ChatList roomList={data} isLoading={isLoading} />
        <div className="col-span-2">
          <ChatBox />
        </div>
        <div
          onClick={toogleChatPopup}
          className="absolute top-2 right-2 bg-opacity-50 flex items-center justify-center cursor-pointer text-secondary-foreground"
        >
          <IoClose size={24} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
