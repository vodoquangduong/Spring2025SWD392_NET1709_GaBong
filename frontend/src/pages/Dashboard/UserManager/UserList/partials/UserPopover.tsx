import { useEffect, useState } from "react";
import StatItem from "../../../../../components/StatItem";
import userDataJson from "../../../../../mocks/users.json";
import { User } from "../../../../../types";
import dayjs from "dayjs";
import { FaGraduationCap, FaPhone, FaUniversity } from "react-icons/fa";

export default function UserPopover({ record }: { record: User }) {
  console.log(record);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <img
          className="h-[80px] aspect-square object-cover object-center border border-zinc-400"
          src={
            record?.avatar
              ? `https://img.nglearns.dev/${record?.avatar}`
              : `https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg`
          }
        />
        <div className="text-sm font-semibold w-[500px]">
          <span className="table-cell-title">
            {record?.name} <span>({record?.email})</span>
          </span>
          <br />
          <span className="text-secondary-foreground text-xs">
            Adress:{" "}
            <span className="font-light text-sm">{record?.address}</span>
            <br />
            Phone number:{" "}
            <span className="font-light text-sm">{record?.phone}</span>
            <br />
            Birthday:{" "}
            <span className="font-light text-sm">
              {dayjs(record?.dob).format("DD/MM/YYYY")}
            </span>
          </span>
        </div>
      </div>
      <div className="flex gap-3 nunito-sans mt-2 justify-between">
        <StatItem
          icon={
            <div className="p-2 bg-blue-200 rounded-md">
              <FaUniversity size={24} className="text-blue-500" />
            </div>
          }
          label={"School"}
          value={record?.school}
        />
        <StatItem
          icon={
            <div className="p-2 bg-green-200 rounded-md">
              <FaPhone size={24} className="text-green-500" />
            </div>
          }
          label={"Major"}
          value={record?.major}
        />
        <StatItem
          icon={
            <div className="p-2 bg-purple-200 rounded-md">
              <FaGraduationCap size={24} className="text-purple-500" />
            </div>
          }
          label={"Degree"}
          value={record?.degree}
        />
      </div>
    </div>
  );
}
