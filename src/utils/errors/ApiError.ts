// src/utils/ApiError.ts
export interface ApiErrorOptions {
  statusCode: number;
  message: string;
  isOperational?: boolean;
  details?: any;
}

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: any;

  constructor({
    statusCode,
    message,
    isOperational = true,
    details,
  }: ApiErrorOptions) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
