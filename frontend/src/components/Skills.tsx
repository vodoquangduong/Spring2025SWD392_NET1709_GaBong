import { Skill } from "@/pages/Portfolio/services/skillService";
import { Tag } from "antd";

export default function Skills({ items }: { items: Skill[] }) {
  // const navigate = useNavigate();
  return (
    <>
      {items &&
        items?.map((item) => (
          <Tag
            key={item?.skillName + item?.skillId}
            color="default"
            className="rounded-full !px-3 mb-2 hover:bg-emerald-400 hover:text-white cursor-pointer"
            onClick={() =>
              (location.href = `/search/projects?skillIds=${item?.skillId}`)
            }
          >
            {item?.skillName}
          </Tag>
        ))}
    </>
  );
}
