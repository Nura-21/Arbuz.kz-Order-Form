export interface Watermelon {
  row: number;
  col: number;
  status: number;
  weight: number;
}

export interface Dates {
  date: string;
  day: number;
  month: number;
  year: number;
}

export interface Hours {
  startHour: number;
  endHour: number;
}

export interface Client {
  address: string;
  house: string;
  houseNumber: string;
  doorNumber: string;
  phone: string;
  comment: string;
}

export interface Order {
  watermelons: Array<Watermelon>;
  date: Dates;
  time: Hours;
  client: Client;
  sliced: boolean;
}
