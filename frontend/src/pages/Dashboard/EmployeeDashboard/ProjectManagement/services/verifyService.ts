// import { LoginRequest, LoginResponse } from "../models/types";
import { POST, PUT } from "@/modules/request";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";

export const approveService = async (
  projectId: string,
  mutation: UseMutationResult<any, unknown, any, unknown>
) => {
  mutation.mutate(projectId);
};

export const rejectService = async (
  projectId: string,
  message: MessageInstance
) => {
  try {
    const mutation = useMutation({
      mutationKey: ["projects"],
      mutationFn: () => PUT(`/api/Project/verify/${projectId}`, {}),
    });

    message.success("Project approved successfully");
  } catch (error) {
    message.error("Project approval failed");
    console.log(error);
  }
};
