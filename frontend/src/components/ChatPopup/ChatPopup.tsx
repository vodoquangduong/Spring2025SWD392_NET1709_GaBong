import React, { useState } from "react";
import ChatList from "./partials/ChatList";
import ChatBox from "./partials/ChatBox";
import { IoClose } from "react-icons/io5";
import useUiStore from "@/stores/uiStore";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import useAuthStore from "@/stores/authStore";

export default function ChatPopup() {
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const { toogleChatPopup, isChatOpen } = useUiStore();
  const { accountId } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["chatList"],
    queryFn: async () => {
      const data = await GET(`/api/ChatRoom/${accountId}`, false);
      console.log(data);
      setCurrentRoom(data[0]);
      return data;
    },
  });
  console.log(data);

  return (
    <div
      className={`fixed bottom-0 right-24 w-[800px] h-[600px] z-40 grid grid-cols-3 border-2 border-b-0 dark:border-zinc-700 transition-all ${
        isChatOpen ? "translate-x-0" : "opacity-0 translate-x-[1000px]"
      }`}
    >
      <ChatList
        roomList={data}
        setCurrentRoom={setCurrentRoom}
        isLoading={isLoading}
      />
      <div className="col-span-2">
        <ChatBox currentRoom={currentRoom} />
      </div>
      <div
        onClick={toogleChatPopup}
        className="absolute top-2 right-2 bg-opacity-50 flex items-center justify-center cursor-pointer text-secondary-foreground"
      >
        <IoClose size={24} />
      </div>
    </div>
  );
}
