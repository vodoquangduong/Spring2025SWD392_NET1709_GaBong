import { POST } from "@/modules/request";

export const placeBid = async (projectId: number, bid: number) => {
  const body = {
    projectId,
    bid,
  };
  return await POST("/api/Bid/place-bid", body);
};
