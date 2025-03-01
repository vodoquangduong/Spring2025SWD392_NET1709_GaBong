import { Empty, Skeleton } from "antd";
import useChatStore from "../stores/chatStore";

export default function ChatList({
  roomList,
  isLoading,
}: {
  roomList: any[];
  isLoading: boolean;
}) {
  const { setCurrentRoom } = useChatStore();
  return (
    <div className="dark:bg-zinc-800 bg-white border-r dark:border-zinc-700">
      <div className="py-2 px-4 font-bold border-b dark:border-zinc-600 text-secondary-foreground">
        Room List
      </div>
      <div>
        {isLoading && (
          <div className="mt-10 w-full flex justify-center items-center text-zinc-500">
            Loading room...
          </div>
        )}
        {roomList?.map((item: any, index: number) => (
          <div onClick={() => setCurrentRoom(item)} key={index}>
            <RoomItem key={index} data={item} />
          </div>
        ))}
        {!isLoading && roomList.length == 0 && (
          <Empty className="mt-10" description="No room found" />
        )}
      </div>
    </div>
  );
}

const RoomItem = ({ data }: { data: any }) => {
  return (
    <div className="flex items-center gap-4 p-3 border-b dark:border-zinc-700 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer">
      <img
        src={`https://robohash.org/${data.chatRoomName}`}
        className="h-12 aspect-square rounded-full object-cover object-center bg-white"
      />
      <div className="text-sm">
        <div
          className="font-bold text-secondary-foreground line-clamp-1"
          title={data?.roomDetails[0]?.account?.name}
        >
          {data?.roomDetails[0]?.account?.name}
        </div>
        <div className="text-zinc-500">
          {data?.roomDetails[0]?.account?.email}
        </div>
      </div>
    </div>
  );
};
