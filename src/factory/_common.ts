export interface ICommonAttr {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ICommonSearchOption {
  limit?: number | string;
  offset?: number | string;
}

export type FormData<T> = {
  [P in keyof T]: T[P] extends Array<any> ? T[P] : T[P] | string;
};
