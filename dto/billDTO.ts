import { Category } from "./categoryDTO";

export type Bill = {
  id: string;
  card: string;
  category: Category;
  date: string;
  item: string;
  people: string;
  value: string;
}

export type BillByYear = {
  month: string;
  value: number;
}

export type Invoice = {
  _id: string;
  item: string;
  value: string;
  category: Category;
}

export type BillByCard = {
  name: string;
  invoices: Invoice[];
  totalInvoice: number;
}