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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState<number>(0);
  // console.log(accountId);

  useEffect(() => {
    const initDirectChat = async () => {
      try {
        await chatService.start();
        if (!isConnected) {
          console.log("start connect success");

          // setIsConnected(true);
          chatService.onReceiveMessage((message) => {
            console.log("Receive message roi ne");
            setMessages((prev) => [...prev, message]);
          });
        }
        // Try to get existing room
        // let response = await axios.get(
        //   ROUTES.API.CHAT.ROOM_MEMBERS.GET_BY_USER_ID(Number(currentUserId))
        // );
        let response = await axios.get(
          ROUTES.API.CHAT.ROOMS.GET(
            Number(currentUserId),
            Number(selectedUserId)
          )
        );

        // If no room exists, create one and add users
        if (!response.data) {
          response = await axios.get(
            ROUTES.API.CHAT.ROOMS.GET(
              Number(currentUserId),
              Number(selectedUserId)
            )
          );

          // Add both users to room
          await axios.post(
            ROUTES.API.CHAT.ROOM_MEMBERS.ADD_USER(
              response.data.id,
              Number(currentUserId)
            )
          );
          await axios.post(
            ROUTES.API.CHAT.ROOM_MEMBERS.ADD_USER(
              response.data.id,
              Number(selectedUserId)
            )
          );
        }

        const room = response.data;
        setRoomId(room.chatRoomID);

        // Join room via SignalR
        console.log("connect ne");
        await chatService.joinRoom(room.chatRoomID);

        // Load previous messages
        const messagesResponse = await axios.get(
          ROUTES.API.CHAT.MESSAGES.GET_BY_ROOM_ID(room.chatRoomID)
        );
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };

    if (currentUserId && selectedUserId) {
      initDirectChat();
    }
  }, [selectedUserId, isConnected]);

  const sendMessage = async () => {
    console.log("🚀 ~ sendMessage ~ roomId:", roomId);
    console.log("🚀 ~ sendMessage ~ message:", message);

    if (message.trim() && roomId) {
      const messageData = {
        senderId: Number(currentUserId),
        chatRoomId: roomId,
        messageContent: message,
        sendAt: new Date(),
      };

      try {
        await axios.post(ROUTES.API.CHAT.MESSAGES.CREATE, messageData);

        // await chatService.sendMessage(roomId, message, Number(currentUserId));
        await chatService.sendMessage(messageData);
        // setMessage("");
        // setMessages([...messages, messageData]);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  // useEffect

  // useEffect(() => {
  //   if (messageEndRef.current) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

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
        {messages.map((message: MessageItemProps, index: number) => (
          <MessageItem
            key={index}
            data={message}
            currentUserId={currentUserId}
          />
        ))}
        <div ref={messageEndRef} className=""></div>
      </div>
      <textarea
        className="p-2 no-ring resize-none bg-white dark:bg-zinc-700 text-secondary-foreground"
        placeholder="Enter your message..."
        rows={2}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          console.log("Ahihi");
          e.key === "Enter" && sendMessage();
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
          data.sender === "me"
            ? "justify-end bg-emerald-600 dark:bg-emerald-600 text-white"
            : "justify-start bg-zinc-300"
        }`}
      >
        {data?.messageContent}
      </p>
    </div>
  );
};
