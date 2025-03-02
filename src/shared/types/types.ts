export type AuthContextType = {
  isAuthenticated: boolean | null;
  validate: () => void;
  isLoading: boolean;
};

export type User = {
  id: string;
  email: string;
  username: string;
};

export type Lot = {
  _id: number;
  number: number;
  date: string;
  code_fuel: number;
  code_nb: number;
  available_balance: string;
  price_per_ton: string;
  status: string;
};

// shared/types/types.ts или рядом
export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};
