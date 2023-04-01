import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useGetUsers = (size = 10) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(size),
    enabled: false,
  });

  return { isLoading, isError, data, error, refetch };
};
