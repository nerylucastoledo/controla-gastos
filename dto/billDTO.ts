import { Category } from "./categoryDTO";

export interface Bill {
  item: string;
  value: string;
  category: Category;
}

export interface BillDTOInput extends Bill {
  date: string;
  people: string;
  card: string;
  installments: number;
}

export interface BillDTOUpdate extends Bill {
  _id: string;
}

export interface BillDTOOutput extends Bill {
  id: string;
  date: string;
  people: string;
  card: string;
}

export interface BillDTOOutputByYear {
  month: string;
  value: string;
}

export interface BillDTOInputByDateAndCard {
  name: string;
  invoices: {
    _id: string;
    item: string;
    value: string;
    category: Category;
  }[];
  totalInvoice: number;
}