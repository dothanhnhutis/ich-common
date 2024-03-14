import { StatusCodes } from "http-status-codes";

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  status: string;
  statusCode: number;
  comingForm: string;
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;
  comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializeError(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
      comingForm: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  status: string = "error";
  statusCode: number = StatusCodes.BAD_REQUEST;
  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
