import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details?: any) {
    super({ statusCode: 401, message, isOperational: true, details });
  }
}
