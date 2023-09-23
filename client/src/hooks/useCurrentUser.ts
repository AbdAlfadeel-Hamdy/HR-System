import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";

const useCurrentUser = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/auth/current-user");
      return data;
    },
    retry: false,
    staleTime: Infinity,
  });

  return {
    isFetching,
    user: data?.user,
    error,
  };
};

export default useCurrentUser;
