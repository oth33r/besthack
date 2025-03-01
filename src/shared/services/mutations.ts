import { useMutation } from "react-query";
import { createUser, login } from "./api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { SignupFormType } from "@pages/Registration/model/types/types";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,

    onError: (error: AxiosError<SignupFormType>) => {
      throw error;
    },
  });
};
