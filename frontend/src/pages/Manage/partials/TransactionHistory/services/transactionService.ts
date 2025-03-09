import { getCookie } from "../../../../../modules/cookie";
import { TransactionData } from "../models/transactionModels";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const transactionService = {
  getTransactionsByAccountId: async (
    accountId: number
  ): Promise<TransactionData[]> => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(`${API_URL}/api/Transaction/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch transactions");
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      // If data is a single transaction object, convert it to an array
      if (data && typeof data === "object" && "transactionId" in data) {
        return [data];
      }

      // If data is already an array
      if (Array.isArray(data)) {
        return data;
      }

      // If data has value property that could be a single transaction or array
      if (data.value) {
        if (Array.isArray(data.value)) {
          return data.value;
        } else if (
          typeof data.value === "object" &&
          "transactionId" in data.value
        ) {
          return [data.value];
        }
      }

      console.error("Unexpected API response format:", data);
      return []; // Return empty array if format is unexpected
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      return []; // Return empty array on error
    }
  },
};
