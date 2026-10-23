import { isAxiosError } from "axios";
import httpRequest from "./http";

export const fetcher = async (url: string) => {
  try {
    const { data } = await httpRequest.get(url);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Something went wrong from Server",
      );
    }
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong from Client");
    }
  }
};
