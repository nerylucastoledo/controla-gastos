import { CategoryDTO } from "./categoryDTO";

export type BillDTO = {
  id: string;
  card: string;
  category: CategoryDTO;
  date: string;
  item: string;
  people: string;
  value: string;
}

export type BillByYearDTO = {
  month: string;
  value: number;
}