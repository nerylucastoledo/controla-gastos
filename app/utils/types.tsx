export interface Data {
  username: string,
  date: string,
  people: string,
  category: string,
  value: string,
  item: string,
  card: string,
}

export interface CardData {
  id: string,
  name: string,
  color: string,
  username: string,
}


export interface Expenses {
  expenses: Data[] | []
  cards: CardData[] | []
}
