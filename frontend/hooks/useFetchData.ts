"use client";
import apiClient from "@/libs/apiClient";
import { useQuery } from "@tanstack/react-query";

export const fetchData = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
}

export const useFetchData = (url: string, qk: string) => {
  return useQuery({
    queryKey: [qk],
    queryFn: () => fetchData(url),
  });
};
