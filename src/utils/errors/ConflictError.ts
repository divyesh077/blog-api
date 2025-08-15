import { ApiError } from "./ApiError";
export class ConflictError extends ApiError {
  constructor(message = "Conflict", details?: any) {
    super({ statusCode: 409, message, isOperational: true, details });
  }
}
