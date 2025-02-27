import { getRandomInt } from "../modules/random";
import { Tag } from "antd";

export default function Skills({ items }: any) {
  console.log("🚀 ~ Skills ~ items:", items);
  // const items = [
  //   "PHP",
  //   "HTML",
  //   "CSS",
  //   "JavaScript",
  //   "SQL",
  //   "React",
  //   "Angular",
  //   "Node.js",
  //   "Python",
  //   "C#",
  //   "C++",
  //   "Java",
  // ];

  return (
    <>
      {items &&
        items?.map((item: any) => (
          <Tag key={item} color="default" className="rounded-full !px-3">
            {item?.skillName}
          </Tag>
        ))}
    </>
  );
}
