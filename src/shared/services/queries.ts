import { useQuery } from "react-query";
import { getLots, getUser, validateUser } from "./api";

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

export const useGetLots = () => {
  return useQuery({
    queryKey: ["lots"],
    queryFn: () => getLots(),
  });
};
