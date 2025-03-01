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
