export interface IExpense {
  username: string,
  date: string,
  people: string,
  category: string,
  value: string,
  item: string,
  card: string,
}

export interface IExpenseByYear {
  month: string;
  value: string;
}

export interface ICardData {
  id: string,
  name: string,
  color: string,
  username: string,
}

export interface IExpensesByUsernameAndDate {
  expenses: IExpense[] | []
  cards: ICardData[] | []
}

export interface IPeople {
  _id: string;
  name: string;
  username: string;
}

export interface ICard {
  _id: string;
  name: string;
  username: string;
  color: string;
}
