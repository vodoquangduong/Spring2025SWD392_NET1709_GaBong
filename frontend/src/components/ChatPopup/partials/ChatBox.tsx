import React, { useEffect, useRef, useState } from "react";

type MessageItemProps = {
  content: string;
  sender: string;
};

export default function ChatBox({
  currentPartner,
}: {
  currentPartner: string;
}) {
  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-zinc-800 h-full flex flex-col">
      <div className="p-4 flex gap-4 border-b dark:border-zinc-700">
        <img
          src={`https://robohash.org/${currentPartner}`}
          className="h-12 aspect-square rounded-full object-cover object-center bg-white"
        />
        <div>
          <div className="font-bold text-base text-secondary-foreground">
            {currentPartner}
          </div>
          <div className="text-base text-zinc-500">Active 2h ago</div>
        </div>
      </div>
      <div
        className=" bg-zinc-400 grow h-[200px] overflow-y-scroll p-2"
        id="message-box"
      >
        {messages.map((message: MessageItemProps, index: number) => (
          <MessageItem key={index} data={message} />
        ))}
        <div ref={messageEndRef} className=""></div>
      </div>
      <textarea
        className="p-2 no-ring resize-none bg-zinc-200 dark:bg-zinc-700 text-secondary-foreground"
        placeholder="Enter your message..."
        rows={2}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            return;
          }
          if (e.key === "Enter") {
            let messageContent = (e.target as HTMLTextAreaElement).value;
            if (messageContent.trim() === "") return;
            e.preventDefault();
            setMessages([
              ...messages,
              {
                content: messageContent,
                sender: "me",
              },
            ]);
            (e.target as HTMLTextAreaElement).value = "";
          }
        }}
      />
    </div>
  );
}

const MessageItem = ({ data }: { data: MessageItemProps }) => {
  return (
    <div className={`flex gap-2 ${data.sender === "me" ? "justify-end" : ""}`}>
      <p
        className={`min-w-14 whitespace-pre-wrap m-0.5 py-2 px-3 text-[16px] rounded-2xl ${
          data.sender === "me"
            ? "justify-end bg-emerald-600 dark:bg-emerald-600 text-white"
            : "justify-start bg-zinc-300"
        }`}
      >
        {data.content}
      </p>
    </div>
  );
};
