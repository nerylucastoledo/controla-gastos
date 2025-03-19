export interface LoginOutput {
  message: string,
  salary: number,
  username: string,
  token: string
}

export interface LoginInput {
  email: string,
  password: string,
}

export interface RegisterOutput {
  message: string,
}

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
  salary: number;
  username: string;
}