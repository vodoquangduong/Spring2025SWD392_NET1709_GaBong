export default function ChatList({
  partnerList,
  setCurrentPartner,
}: {
  partnerList: string[];
  setCurrentPartner: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="dark:bg-zinc-800 bg-white border-r dark:border-zinc-700">
      <div className="p-2 font-bold border-b dark:border-zinc-600">
        Partner List
      </div>
      <div>
        {partnerList.map((partner: string, index: number) => (
          <div onClick={() => setCurrentPartner(partner)} key={index}>
            <PartnerItem key={index} data={partner} />
          </div>
        ))}
      </div>
    </div>
  );
}

const PartnerItem = ({ data }: { data: string }) => {
  return (
    <div className="flex items-center gap-4 p-3 border-b dark:border-zinc-700 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer">
      <img
        src={`https://robohash.org/${data}`}
        className="h-12 aspect-square rounded-full object-cover object-center bg-white"
      />
      <div className="text-sm">
        <div className="font-bold text-secondary-foreground">Mohamed Salah</div>
        <div className="text-zinc-500">
          <span>Active 2h ago</span>
        </div>
      </div>
    </div>
  );
};
