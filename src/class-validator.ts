import {
  isArray,
  isEmail,
  isEnum,
  isNotEmpty,
  isNumber,
  isPositive,
  maxLength,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import * as _ from 'lodash';

import { validatorMessages } from './factory';

export const MaxLength = (
  length: number,
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'maxLength',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkMaxLength(fieldName, length.toString()),
      },
      validator: {
        validate(value: string | number) {
          // If it is not number or string -> Skip validate
          if (!_.isNumber(value) && !_.isString(value)) {
            return true;
          }
          return maxLength(value.toString(), length);
        },
      },
    });
  };
};

export const IsPositive = (
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isPositive',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkIsPositiveInteger(fieldName),
      },
      validator: {
        validate(value: string | number) {
          // If it is not number or string -> Skip validate
          if (!_.isNumber(value) && !_.isString(value)) {
            return true;
          }
          return isPositive(value);
        },
      },
    });
  };
};

export const IsNumber = (
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkType(fieldName, 'number'),
      },
      validator: {
        validate(value: string | number) {
          return isNumber(value);
        },
      },
    });
  };
};

export const IsNotEmpty = (
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotEmpty',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkRequired(fieldName),
      },
      validator: {
        validate(value: string | number) {
          return isNotEmpty(value);
        },
      },
    });
  };
};

export const IsArray = (
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkType(fieldName, 'array'),
      },
      validator: {
        validate(value: string | number) {
          return isArray(value);
        },
      },
    });
  };
};

export const IsEmail = (
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isEmail',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkIsValid(fieldName),
      },
      validator: {
        validate(value: string) {
          return isEmail(value);
        },
      },
    });
  };
};

export const IsEnum = (
  enumCheck: any,
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isEnum',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: validatorMessages.checkIsValid(fieldName),
      },
      validator: {
        validate(value: string) {
          return isEnum(value, enumCheck);
        },
      },
    });
  };
};
