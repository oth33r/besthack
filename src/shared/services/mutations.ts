import { useMutation } from "react-query";
import { API, createUser, login } from "./api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { SignupFormType } from "@pages/Registration/model/types/types";

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
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
