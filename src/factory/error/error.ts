import HttpStatus from 'http-status';

import { messages } from '../../constants';
import { ErrorCode } from './_errorCode';

/**
 * Error
 */
export default class BWError extends Error {
  public readonly reason: ErrorCode | string;
  public readonly httpStatus: number;

  constructor(
    code: ErrorCode | string,
    message: string = messages.systemError,
    httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);

    this.name = 'Error.';
    this.httpStatus = httpStatus;
    this.reason = code;
  }
}
