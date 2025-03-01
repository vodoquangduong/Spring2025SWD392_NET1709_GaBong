import React, { useEffect, useRef, useState } from "react";
import { ChatService, ROUTES } from "../services/chatService";
import useAuthStore from "@/stores/authStore";
import { GET, POST } from "@/modules/request";
import axios from "axios";
import { Empty, Skeleton } from "antd";
import { data } from "react-router-dom";
import useChatStore from "../stores/chatStore";
import { NotificationType } from "@/types/notification";

type MessageItemProps = {
  content: string;
  sender: string;
};

export default function ChatBox() {
  const { currentRoom, notifyService, setNotification } = useChatStore();
  const currentRoomId = currentRoom?.chatRoomID;
  const receiverId = currentRoom?.roomDetails?.[0]?.accountId;

  const chatService = new ChatService();
  const { accountId: currentUserId } = useAuthStore();
  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset messages when partner changes
    setMessages([]);
    return () => {
      // Cleanup: Stop the connection when partner changes or component unmounts
      chatService
        .stop()
        .then(() => console.log("Connection stopped for partner change"));
    };
  }, [currentRoomId]);

  useEffect(() => {
    let isMounted = true;

    const initDirectChat = async () => {
      try {
        await chatService.start();
        if (!isMounted) return;

        setIsConnected(true);

        // Register the message handler ONCE
        chatService.onReceiveMessage((message) => {
          if (isMounted) {
            setMessages((prev) => [...prev, message]);
          }
        });

        setIsLoading(true);

        // Get or create chat room
        if (!isMounted) return;

        setRoomId(currentRoomId);
        console.log("Joining room:", currentRoomId);
        await chatService.joinRoom(currentRoomId);

        // Load previous messages
        const messagesResponse = await axios.get(
          ROUTES.API.CHAT.MESSAGES.GET_BY_ROOM_ID(currentRoomId)
        );
        if (!isMounted) return;

        setMessages(messagesResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };

    if (currentUserId && currentRoomId) {
      initDirectChat();
    }

    // Cleanup function: Stop connection and remove listeners
    return () => {
      isMounted = false;
      chatService
        .stop()
        .then(() => console.log("Connection stopped on cleanup"));
    };
  }, [currentUserId, currentRoomId]);

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

      //> Gửi thông báo cho người đối diện là có tin nhắn mới
      notifyService?.sendNotification(
        Number(receiverId),
        NotificationType.CHAT,
        "New message"
      );
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
    messageInputRef.current?.focus();
  }, [messages, isLoading]);

  return (
    <div className="bg-white dark:bg-zinc-800 h-full flex flex-col">
      <div className="p-4 flex gap-4 border-b dark:border-zinc-700">
        {currentRoomId ? (
          <img
            src={`https://robohash.org/${
              currentRoom.chatRoomName || "placeholder"
            }`}
            className="h-12 aspect-square rounded-full object-cover object-center bg-white"
          />
        ) : (
          <Skeleton.Avatar style={{ height: 50, width: 50 }} />
        )}

        <div>
          <div className="font-bold text-base text-secondary-foreground">
            {currentRoom?.roomDetails?.[0]?.account?.name || (
              <Skeleton.Input style={{ width: 280, height: 30 }} />
            )}
          </div>
          {currentRoom?.roomDetails?.[0]?.account?.email ? (
            <div className="text-base text-zinc-500">
              {currentRoom?.roomDetails?.[0]?.account?.email}
            </div>
          ) : (
            <Skeleton.Input className="mt-1" style={{ height: 10 }} />
          )}
        </div>
      </div>
      <div
        className="bg-zinc-300 dark:bg-zinc-800 grow h-[200px] overflow-y-scroll"
        id="message-box"
      >
        <div className="pl-2 pr-1 relative py-2">
          {
            //> display message items
            messages.length === 0 && !isLoading && currentRoom ? (
              <Empty
                className="mt-8"
                description="You have no message, start the conversation now"
              />
            ) : (
              <>
                {messages.map((message: any, index: number) => (
                  <MessageItem
                    key={index}
                    data={message}
                    currentUserId={currentUserId}
                  />
                ))}
              </>
            )
          }

          {isLoading && (
            <div
              id="loading"
              className="flex flex-col justify-center items-center gap-4 z-10 mt-8"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
              <span className="text-zinc-500 pb-8">Loading message ...</span>
            </div>
          )}
        </div>
        {/* //> Used for scrolling to bottom after message sent */}
        <div ref={messageEndRef} className=""></div>
      </div>
      <textarea
        className="p-2 no-ring resize-none bg-white dark:bg-zinc-700 text-secondary-foreground"
        placeholder={
          isLoading ? "Loading message ..." : "Enter your message..."
        }
        disabled={isLoading}
        rows={2}
        ref={messageInputRef}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // scrollIntoView();
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
        className={`min-w-14 whitespace-pre-wrap m-0.5 py-2 px-3 text-[16px] rounded-2xl text-start ${
          data.senderId == currentUserId
            ? "justify-end bg-emerald-600 dark:bg-emerald-600 text-white"
            : "justify-start bg-zinc-100"
        }`}
        style={{
          wordWrap: "break-word",
          maxWidth: "80%",
        }}
      >
        {data?.messageContent}
      </p>
    </div>
  );
};
