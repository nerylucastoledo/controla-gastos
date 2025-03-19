import { categorys } from "../utils";
import { CardOutput } from "./cardDTO";

export interface Expense {
  username: string;
  date: string;
  people: string;
  category: typeof categorys[number];
  value: string;
  item: string;
  card: string;
  installments?: number;
}

export interface ExpenseOutputByUsernameAndYear {
  month: string;
  value: string;
}

export interface ExpensesByUsernameAndDateOutput {
  expenses: Expense[] | []
  cards: CardOutput[] | []
}
