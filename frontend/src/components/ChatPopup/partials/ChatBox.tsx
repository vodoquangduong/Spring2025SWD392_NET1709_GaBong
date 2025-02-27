import React, { useEffect, useRef, useState } from "react";
import { ChatService, ROUTES } from "../services/chatService";
import useAuthStore from "@/stores/authStore";
import { GET, POST } from "@/modules/request";
import axios from "axios";

type MessageItemProps = {
  content: string;
  sender: string;
};

export default function ChatBox({ currentPartner }: { currentPartner: any }) {
  const chatService = new ChatService();
  const { accountId: currentUserId } = useAuthStore();
  const selectedUserId = currentPartner.accountId;
  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    //> init when change user to chat with
    const initDirectChat = async () => {
      try {
        await chatService.start();
        setIsConnected(true);
        chatService.onReceiveMessage((message) => {
          console.log("Received message:", message);
          setMessages((prev) => [...prev, message]);
        });
        setIsLoading(true);

        //> Get or create chat room
        let response = await axios.get(
          ROUTES.API.CHAT.ROOMS.GET(
            Number(currentUserId),
            Number(selectedUserId)
          )
        );

        if (!response.data) {
          //> If no room exists, create one (assuming GET handles creation if not found)
          response = await axios.get(
            ROUTES.API.CHAT.ROOMS.GET(
              Number(currentUserId),
              Number(selectedUserId)
            )
          );

          await axios.post(
            ROUTES.API.CHAT.ROOM_MEMBERS.ADD_USER(
              response.data.chatRoomID,
              Number(currentUserId)
            )
          );
          await axios.post(
            ROUTES.API.CHAT.ROOM_MEMBERS.ADD_USER(
              response.data.chatRoomID,
              Number(selectedUserId)
            )
          );
        }

        const room = response.data;
        setRoomId(room.chatRoomID);

        //> Join room after
        console.log("Joining room:", room.chatRoomID);
        await chatService.joinRoom(room.chatRoomID);

        //> Load previous messages
        const messagesResponse = await axios.get(
          ROUTES.API.CHAT.MESSAGES.GET_BY_ROOM_ID(room.chatRoomID)
        );
        setIsLoading(false);
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };

    if (currentUserId && selectedUserId) {
      initDirectChat();
    }

    return () => {
      //TODO: Optionally stop the connection if needed: chatService.connection.stop() or chatService.leaveChat();
    };
  }, [currentUserId, selectedUserId]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || !roomId || !isConnected) {
      console.log("Cannot send: message empty, no room, or not connected");
      return;
    }

    const messageData = {
      senderId: Number(currentUserId),
      chatRoomId: roomId,
      messageContent: message,
      sendAt: new Date(),
    };

    try {
      setIsLoading(true);
      await axios.post(ROUTES.API.CHAT.MESSAGES.CREATE, messageData);
      await chatService.sendMessage(messageData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-zinc-800 h-full flex flex-col">
      <div className="p-4 flex gap-4 border-b dark:border-zinc-700">
        <img
          src={`https://robohash.org/${currentPartner?.name}`}
          className="h-12 aspect-square rounded-full object-cover object-center bg-white"
        />
        <div>
          <div className="font-bold text-base text-secondary-foreground">
            {currentPartner?.name}
          </div>
          <div className="text-base text-zinc-500">Active 2h ago</div>
        </div>
      </div>
      <div
        className="bg-zinc-300 dark:bg-zinc-800 grow h-[200px] overflow-y-scroll p-2"
        id="message-box"
      >
        {messages.map((message: any, index: number) => (
          <MessageItem
            key={index}
            data={message}
            currentUserId={currentUserId}
          />
        ))}
        {isLoading && (
          <div className="flex flex-col justify-center items-center my-4 gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
            <span className="text-zinc-500 pb-8">Loading message ...</span>
          </div>
        )}
        <div ref={messageEndRef} className=""></div>
      </div>
      <textarea
        className="p-2 no-ring resize-none bg-white dark:bg-zinc-700 text-secondary-foreground"
        placeholder="Enter your message..."
        rows={2}
        ref={messageInputRef}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            sendMessage((e.target as HTMLTextAreaElement).value);
            (e.target as HTMLTextAreaElement).value = "";
          }
        }}
      />
    </div>
  );
}

const MessageItem = ({
  data,
  currentUserId,
}: {
  data: any;
  currentUserId: number;
}) => {
  return (
    <div
      className={`flex gap-2 ${
        data.senderId == currentUserId ? "justify-end" : ""
      }`}
    >
      <p
        className={`min-w-14 whitespace-pre-wrap m-0.5 py-2 px-3 text-[16px] rounded-2xl ${
          data.senderId == currentUserId
            ? "justify-end bg-emerald-600 dark:bg-emerald-600 text-white"
            : "justify-start bg-zinc-100"
        }`}
      >
        {data?.messageContent}
      </p>
    </div>
  );
};
