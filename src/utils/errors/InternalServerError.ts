import { ApiError } from "./ApiError";

export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", details?: any) {
    super({ statusCode: 500, message, isOperational: true, details });
  }
}
