export type ShowcaseItemType = {
  image: string;
  title: string;
};

export const ShowcaseItem = ({ item }: any) => {
  return (
    <div
      className="w-full h-[200px] bg-cover bg-no-repeat rounded-lg bg-center group transition-all duration-300 hover:scale-[115%] hover:border hover:z-10"
      style={{
        backgroundImage: `url(${item.image})`,
      }}
    >
      <div className="text-white absolute text-base bottom-0 left-0 group-hover:opacity-100 opacity-0 font-semibold bg-black/50 p-2 rounded-b-lg">
        {item.title}
      </div>
    </div>
  );
};

export default function Showcase({
  items,
  swap = false,
}: {
  items: ShowcaseItemType[];
  swap?: boolean;
}) {
  return (
    <div className="mx-60 gap-4 my-24 grid grid-cols-2 grid-rows-2 h-[400px]">
      <div
        className={`relative w-full h-[416px] bg-cover bg-no-repeat rounded-lg bg-center group transition-all duration-300 hover:scale-[115%] hover:border hover:z-10 ${
          swap ? "order-last" : "order-first"
        }`}
        style={{
          backgroundImage: `url(${items[0].image})`,
        }}
      >
        <div className="text-white absolute group-hover:opacity-100 opacity-0 font-semibold bg-black/50 p-4 w-full bottom-0 left-0 rounded-b-lg">
          {items[0].title}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 h-full">
        {items.slice(1).map((item) => (
          <ShowcaseItem key={item.image} item={item} />
        ))}
      </div>
    </div>
  );
}
