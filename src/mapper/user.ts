import * as factory from '../factory/user';
import { pick, pickForSearch } from '../utils';

export const searchData = (req: AbstractRequest) => {
  const params = pickForSearch(<factory.IUserSearchParams>req.query, [
    'name',
    'dateFrom',
    'dateTo',
  ]);

  return { ...params };
};

export const formDataCreate = (req: AbstractRequest) => {
  return pick(<factory.UserForm>req.body, [
    'email',
    'name',
    'groupId',
    'startedDate',
    'positionId',
    'password',
  ]);
};
