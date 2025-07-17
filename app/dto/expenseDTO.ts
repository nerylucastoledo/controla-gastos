import { BillDTO } from "./bill";
import { CardDTO } from "./cardDTO";

export type Expense = {
  expenses: BillDTO[];
  cards: CardDTO[];
}