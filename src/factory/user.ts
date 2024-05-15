import { FormData, ICommonAttr, ICommonSearchOption } from './_common';

export enum Position {
  Director = 0,
  Group = 1,
  Leader = 2,
  Member = 3,
}

export interface IUserMainAttr {
  email: string;
  password: string;
  name: string;
  groupId: number;
  startedDate: string;
  positionId: number;
}

export interface IUserAttr extends IUserMainAttr, ICommonAttr {}

export interface IUserSearchParams extends ICommonSearchOption {
  name: string;
  dateFrom: string;
  dateTo: string;
}

export declare type UserForm = FormData<IUserMainAttr>;

export interface PayloadFormUpdate {
  id?: number;
  email: string;
  name: string;
  group_id: string | number;
  position_id: string | number;
  started_date: string;
  password?: string;
  updatedDate?: string;
  deletedDate?: string;
}

export interface DataImportType {
  delete: string | null;
  email: string;
  groupId: string;
  ID: string | null;
  name: string;
  password: string;
  positionId: string;
  startedDate: string;
}
