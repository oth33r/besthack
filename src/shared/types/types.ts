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
  id: number;
  lotNumber: number;
  fuelType: string;
  oilBaseName: string;
  region: string;
  pricePerTon: number;
  availableVolume: number;
};

// shared/types/types.ts или рядом
export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};
