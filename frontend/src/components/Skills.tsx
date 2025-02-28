import { Tag } from "antd";

export default function Skills({ items }: any) {
  return (
    <>
      {items &&
        items?.map((item: any) => (
          <Tag key={item} color="default" className="rounded-full !px-3 mb-2">
            {item?.skillName}
          </Tag>
        ))}
    </>
  );
}
