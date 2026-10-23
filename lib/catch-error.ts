import { message } from "antd";
import { isAxiosError } from "axios";

export const catchError = (err: unknown) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "dev") {
    console.log(err);
  }

  if (isAxiosError(err)) {
    return message.error(
      err.response?.data.message || "Unknown error from Server",
    );
  }
  if (err instanceof Error) {
    return message.error(err.message || "unknown error from Client");
  }
  return message.error("Unknown Error");
};
