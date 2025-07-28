export interface PeopleDTOInput {
  name: string;
}

export interface PeopleDTOOutput extends PeopleDTOInput {
  _id: string;
}