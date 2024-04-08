import { TransformFnParams } from 'class-transformer';
import { filter, isNil } from 'lodash';

export const transformMultipleValueAsArray = (params: TransformFnParams) => {
  if (isNil(params.value)) {
    return params.value;
  }

  const filterOutNil = (array: Array<number | string>) =>
    filter(array, (value) => !isNil(value) && value !== '');

  if (params.value instanceof Array) {
    return filterOutNil(params.value);
  }

  if (typeof params.value === 'string') {
    return filterOutNil(params.value.split(','));
  }

  return [params.value];
};

/**
 * transform paramater to null if it is empty string
 */
export const emptyStringAsNull = (params: TransformFnParams) => {
  if (typeof params.value === 'string' && params.value.length === 0) {
    return null;
  }
  return params.value;
};
