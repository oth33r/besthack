export interface Lot {
  _id: number;
  number: number;
  date: string;
  code_nb: number;
  code_fuel: number;
  start_weight: string;
  available_balance: string;
  status: string;
  price: string;
  price_per_ton: string;
  region_code: number;
}

export interface Order {
  lot_number: number;
  code_nb: number;
  code_fuel: number;
  volume: number;
  delivery_type: string;
  user_id: string;
}
