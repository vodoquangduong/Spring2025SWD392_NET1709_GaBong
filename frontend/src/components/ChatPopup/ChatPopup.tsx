import React, { useState } from "react";
import ChatList from "./partials/ChatList";
import ChatBox from "./partials/ChatBox";
import { IoClose } from "react-icons/io5";

export default function ChatPopup({
  setIsChatOpen,
}: {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const partnerList = ["Mohamed Salah", "Cristiano Ronaldo", "Lionel Messi"];
  const [currentPartner, setCurrentPartner] = useState<string>(partnerList[0]);

  return (
    <div className="fixed bottom-0 right-24 w-[800px] h-[600px] z-40 grid grid-cols-3 border-2 border-b-0 dark:border-zinc-700">
      <ChatList
        partnerList={partnerList}
        setCurrentPartner={setCurrentPartner}
      />
      <div className="col-span-2">
        <ChatBox currentPartner={currentPartner} />
      </div>
      <div
        onClick={() => setIsChatOpen(false)}
        className="absolute top-2 right-2 bg-opacity-50 flex items-center justify-center cursor-pointer text-secondary-foreground"
      >
        <IoClose size={24} />
      </div>
    </div>
  );
}
