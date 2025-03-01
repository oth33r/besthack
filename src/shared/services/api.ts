import { AuthorizationFormType } from "@pages/Authorization/model/types/types";
import { SignupFormType } from "@pages/Registration/model/types/types";
import axios from "axios";

export const API = axios.create();

export const login = async (data: AuthorizationFormType) => {
  return await API.post<AuthorizationFormType>("/api/auth/generate", data);
};

export const getUser = async (id: string) => {
  return await API.get<AuthorizationFormType>(`/api/user/?user_id=${id}`, {
    withCredentials: true,
  });
};

export const createUser = async (data: SignupFormType) => {
  return await API.post<SignupFormType>("/api/user/", {
    email: data.email,
    password: data.password,
    role: "user",
  });
};

export const validateUser = async () => {
  return await API.get("/api/validate", { withCredentials: true });
};
