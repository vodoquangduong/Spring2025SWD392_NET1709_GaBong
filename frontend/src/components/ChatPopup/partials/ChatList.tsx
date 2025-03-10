import { Empty, Skeleton } from "antd";
import useChatStore from "../stores/chatStore";
import { defaultAvatar } from "@/modules/default";

export default function ChatList({
  roomList,
  isLoading,
}: {
  roomList: any[];
  isLoading: boolean;
}) {
  const { setCurrentRoom, currentRoom } = useChatStore();
  return (
    <div className="dark:bg-zinc-800 bg-white border-r dark:border-zinc-700">
      <div className="py-2 px-4 font-bold border-b dark:border-zinc-600 text-secondary-foreground">
        Partner List
      </div>
      <div>
        {isLoading && (
          <div className="mt-10 w-full flex justify-center items-center text-zinc-500">
            Loading partners ...
          </div>
        )}
        {roomList?.map((item: any, index: number) => (
          <div onClick={() => setCurrentRoom(item)} key={index}>
            <RoomItem key={index} data={item} currentRoom={currentRoom} />
          </div>
        ))}
        {!isLoading && roomList.length == 0 && (
          <Empty className="mt-10" description="No partner found" />
        )}
      </div>
    </div>
  );
}

const RoomItem = ({ data, currentRoom }: { data: any; currentRoom: any }) => {
  console.log("cur", currentRoom);

  return (
    <div
      className={`flex items-center gap-4 p-3 border-b dark:border-zinc-700 cursor-pointer ${
        data?.chatRoomID == currentRoom?.chatRoomID
          ? "bg-emerald-500 dark:bg-emerald-500 text-white"
          : "dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-secondary-foreground"
      }`}
    >
      <img
        src={data?.roomDetails[0]?.account?.avatarURL || defaultAvatar}
        className="h-12 aspect-square rounded-full object-cover object-center bg-white"
      />
      <div className="text-sm">
        <div
          className="font-bold line-clamp-1"
          title={data?.roomDetails[0]?.account?.name}
        >
          {data?.roomDetails[0]?.account?.name}
        </div>
        <div className="">{data?.roomDetails[0]?.account?.email}</div>
      </div>
    </div>
  );
};
