import 'reflect-metadata';

import { IsEmail, IsNotEmpty, MaxLength } from '../class-validator';

export class LoginDTO {
  @MaxLength(255, 'Email')
  @IsEmail('Email')
  @IsNotEmpty('Email')
  public email: string;

  @IsNotEmpty('Password')
  public password: string;
}
