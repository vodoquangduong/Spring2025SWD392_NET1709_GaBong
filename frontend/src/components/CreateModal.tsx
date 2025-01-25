import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
import { FormCallback } from "../types";

type CreateModalProps = {
  children: ReactNode;
  form: FormCallback;
  modalTitle: string;
  icon?: ReactNode;
};

// General component for creating modals
const CreateModal = ({
  children,
  form,
  modalTitle,
  icon,
}: CreateModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        className="font-semibold"
        icon={icon}
        type="primary"
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
        footer={(_, { OkBtn, CancelBtn }) => <></>}
      >
        <div className="mt-4 overflow-y-scroll ml-2 max-h-[500px]">
          {form(setIsModalOpen)}
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
