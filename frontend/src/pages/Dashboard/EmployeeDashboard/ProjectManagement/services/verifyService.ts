// import { LoginRequest, LoginResponse } from "../models/types";
import { POST, PUT } from "@/modules/request";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";

export const approveService = async (
  projectId: string,
  mutation: UseMutationResult<any, unknown, any, unknown>
) => {
  mutation.mutate({
    projectId: projectId,
    isVerified: true,
  });
};

export const rejectService = async (
  projectId: string,
  mutation: UseMutationResult<any, unknown, any, unknown>
) => {
  mutation.mutate({
    projectId: projectId,
    isVerified: false,
  });
};
