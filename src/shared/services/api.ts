import { AuthorizationFormType } from "@pages/Authorization/model/types/types";
import { SignupFormType } from "@pages/Registration/model/types/types";
import { Lot } from "@shared/types/types";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://185.157.214.169:8888",
});

import { AuthResponse } from "@shared/types/types";

export const login = async (data: AuthorizationFormType) => {
  return await API.post<AuthResponse>("/auth/generate", data);
};

export const getUser = async (id: string) => {
  return await API.get<AuthorizationFormType>(`/user/?user_id=${id}`);
};

export const createUser = async (data: SignupFormType) => {
  return await API.post<SignupFormType>("/user/", {
    email: data.email,
    password: data.password,
    role: "user",
  });
};

export const validateUser = async () => {
  return await API.get("/validate/");
};

export const getLots = async () => {
  return await API.get<Lot[]>("/lot/");
};
