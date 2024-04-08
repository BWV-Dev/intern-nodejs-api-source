import { IUserMainAttr } from './user';

export interface ILoginParams {
  email: string;
  password: string;
}

// export interface IRegisterParams {
//   name: string;
//   staffName: string;
//   email: string;
//   userName: string;
// }

export interface IUserInfo extends Omit<IUserMainAttr, 'password'> {
  id: number;
  name: string;
}
