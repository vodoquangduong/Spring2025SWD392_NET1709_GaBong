import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
import { FormCallback } from "../types";
import { BaseButtonProps } from "antd/es/button/button";

type CreateModalProps = {
  children: ReactNode;
  form: FormCallback;
  modalTitle: string;
  icon?: ReactNode;
  type?: BaseButtonProps["type"];
};

// General component for creating modals
const CreateModal = ({
  children,
  form,
  modalTitle,
  icon,
  type = "primary",
}: CreateModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        className="font-semibold"
        icon={icon}
        type={type}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </Button>
      <Modal
        title={<div className="ml-2 text-2xl">{modalTitle}</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        centered
        width={840}
        footer={(_) => <></>}
      >
        <div className="mt-4 overflow-y-scroll ml-2 pr-2">
          {form(setIsModalOpen)}
          <div></div>
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
