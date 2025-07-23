import { Category } from "./categoryDTO";

export type EditInvoiceInput = {
  _id: string;
  category: Category;
  value: string;
  item: string;
}