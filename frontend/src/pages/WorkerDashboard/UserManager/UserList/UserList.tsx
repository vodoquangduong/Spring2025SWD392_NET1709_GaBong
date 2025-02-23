import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { userColumns } from "../schemas";
import CreateUserForm from "../forms/CreateUserForm";
import SearchBox from "../../../../components/SearchBox";
import CreateModal from "../../../../components/CreateModal";
import userDataJson from "../../../../mocks/users.json";
import { GET } from "../../../../libs/request";
import { User } from "../../../../types";
import { motion } from "motion/react";
import { PAGE_ANIMATION } from "../../../../modules/constants";

export default function UserList() {
  const [listData, setListData] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      // const data = await GET("/account/list");
      // setListData(data.data.data);
      setListData(userDataJson);
    })();
  }, []);
  return (
    <motion.div {...PAGE_ANIMATION}>
      <div className="flex justify-between mb-4 items-center">
        <SearchBox />
        <CreateModal
          children="+ New User"
          modalTitle={"Create New User"}
          form={(
            setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
          ) => <CreateUserForm setIsModalOpen={setIsModalOpen} />}
        />
      </div>
      <Table
        columns={userColumns()}
        dataSource={listData}
        rowKey={(record: any) => record?.id}
      />
    </motion.div>
  );
}
