export interface CardDTOOutput {
  _id: string;
  name: string;
  username: string;
  color: string;
}

export interface CardDTOInput {
  name: string;
  color: string;
}

export interface CardDTO {
  _id: string;
  name: string;
}