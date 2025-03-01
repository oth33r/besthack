import { useQuery } from "react-query";
import { getUser, validateUser } from "./api";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });
};

export const useValidateUser = () => {
  return useQuery({
    queryKey: ["validate"],
    queryFn: () => validateUser(),
  });
};
