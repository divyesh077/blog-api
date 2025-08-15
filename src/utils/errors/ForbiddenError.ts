import { ApiError } from "./ApiError";

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details?: any) {
    super({ statusCode: 403, message, isOperational: true, details });
  }
}
