import { ApiError } from "./ApiError";

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details?: any) {
    super({ statusCode: 400, message, isOperational: true, details });
  }
}
