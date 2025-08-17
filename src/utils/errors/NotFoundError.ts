import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found", details?: any) {
    super({ statusCode: 404, message, details });
  }
}
