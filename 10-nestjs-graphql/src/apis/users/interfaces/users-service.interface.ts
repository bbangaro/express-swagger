export interface IUsersServiceCreate {
  name: string;
  password: string;
  age: number;
  email: string;
}

export interface IUsersServiceFindIneByEmail {
  email: string;
}
