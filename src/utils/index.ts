import _ from 'lodash';

export const pick = <T extends object>(
  params: T,
  field: (keyof T)[],
  childArrayOption?: { [i: string]: string[] },
) => {
  const result = <Required<T>>_.pick(params, field);

  if (childArrayOption !== undefined) {
    for (const childField of _.keys(childArrayOption)) {
      const childData = _.map(
        _.get(params, childField, []) as Array<any>,
        (child) => _.pick(child, childArrayOption[childField]),
      );
      _.set(result, childField, childData);
    }
  }

  return result;
};

/**
 * same as pick function but exclude undefined and empty string
 * @param params search parameter
 * @param fields field to pick
 */
export const pickForSearch = <T extends object>(
  params: T,
  fields: (keyof T)[],
) => {
  return <T>(
    _.pickBy(
      params,
      (value, key) =>
        _.includes(fields, <keyof T>key) &&
        (!_.isEmpty(value) || _.isFinite(value)),
    )
  );
};
