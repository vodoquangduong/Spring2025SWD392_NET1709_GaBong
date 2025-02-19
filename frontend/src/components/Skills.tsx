import { getRandomInt } from "../modules/random";
import { Tag } from "antd";

export default function Skills() {
  const items = [
    "PHP",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "React",
    "Angular",
    "Node.js",
    "Python",
    "C#",
    "C++",
    "Java",
  ];

  return (
    <>
      {items
        .slice(getRandomInt(0, 6), getRandomInt(7, items.length - 1))
        .slice(0, 4)
        .map((item) => (
          <Tag color="default" className="rounded-full !px-3">
            {item}
          </Tag>
        ))}
    </>
  );
}
