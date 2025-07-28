import { Card } from "./cardDTO";
import { Category } from "./categoryDTO";

export type Bill = {
  card: string;
  category: Category;
  date: string;
  item: string;
  people: string;
  value: string;
}

export type BillInput = Bill & {
  installments: number;
}

export type BillOutput = Bill & {
  id: string;
}

export type Expense = {
  expenses: BillOutput[];
  cards: Card[];
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

