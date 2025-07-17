import { Bill } from "./billDTO";
import { Card } from "./cardDTO";

export type Expense = {
  expenses: Bill[];
  cards: Card[];
}