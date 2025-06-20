import apiClient from "@/libs/apiClient";
import { useMutation } from "@tanstack/react-query";

type HttpMethod = "post" | "put" | "patch" | "delete";

export const sendData = (url: string, data: any, method: HttpMethod) => {

  if (method === "delete") {
    return apiClient.delete(url, { data }); 
  }

  return apiClient[method](url, data);
};

export const useSendData = (url: string, method: HttpMethod = "post") => {
  return useMutation({
    mutationFn: (data: any) => sendData(url, data, method),
  });
};
