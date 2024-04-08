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

export class UserCreateDTO {
  @MaxLength(255, 'Email')
  @IsEmail('Email')
  @IsNotEmpty('Email')
  public email: string;

  @MaxLength(100, 'User Name')
  @IsNotEmpty('User Name')
  public name: string;

  @IsNotEmpty('Group ID')
  public groupId: number;

  @IsNotEmpty('Started Date')
  public startedDate: Date;

  @IsNotEmpty('Position ID')
  public positionId: number;

  @MaxLength(20, 'Password')
  @IsNotEmpty('Password')
  public password: string;
}
