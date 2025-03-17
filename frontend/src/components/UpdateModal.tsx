import CreateModal from "./CreateModal";
import { FaRegEdit } from "react-icons/fa";
import { ReactNode } from "react";
import { FormCallback } from "@/types";

type UpdateModalProps = {
  record: any;
  form: FormCallback;
  min?: boolean;
  title?: string;
  icon?: ReactNode;
};

const UpdateModal = ({
  record,
  form,
  min = false,
  title = "Update",
  icon = <FaRegEdit />,
}: UpdateModalProps) => {
  return (
    <CreateModal
      icon={icon}
      children={!min && "Update"}
      modalTitle={title}
      form={form}
    />
  );
};

export default UpdateModal;
